import argparse
import functools
import logging
import os
import sys
import shutil
import subprocess

from pathlib import Path

import livereload
import rcssmin

import toolconfig


class BuildException(Exception):
    pass


def _create_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog='tool.py',
        description='A utility for building the temporary Dev8 website.')
    parser.add_argument('task', choices=['build', 'serve'])

    return parser


def _setup_logger(name: str):
    logger: logging.Logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    
    # Create handler to log to console.
    console_handler: logging.StreamHandler = logging.StreamHandler()
    console_formatter: logging.Formatter = logging.Formatter('%(message)s')
    console_handler.setFormatter(console_formatter)
    console_handler.setLevel(logging.DEBUG)
    
    logger.addHandler(console_handler)

    # Create handler to log to file.
    file_handler: logging.FileHandler = logging.FileHandler('tool.py.log')

    file_format: str = '%(asctime)s: %(name)-18s [%(levelname)-8s] %(message)s'
    file_formatter: logging.Formatter = logging.Formatter(file_format)

    file_handler.setFormatter(file_formatter)
    file_handler.setLevel(logging.INFO)
    
    logger.addHandler(file_handler)

    return logger


def _build(base_dist_dir: Path=Path('dist'), mode: str='production'):
    os.makedirs(base_dist_dir, exist_ok=True)

    # Set routes.
    for route, html_file in toolconfig.routes.items():
        route: str = route.strip('/')  # Having '/' at the start messes up Path.

        src: Path = html_file
        dest: Path = base_dist_dir / route / 'index.html'
        
        dest.parent.mkdir(exist_ok=True, parents=True)

        shutil.copy(src, dest)

    # Preprocess files.
    assets_dir: Path = base_dist_dir / 'assets'
    for processed_file, src_file in toolconfig.processed_files.items():
        # Create the files first in the dist/ folder.
        target_path: Path = assets_dir / processed_file
        target_path.parent.mkdir(exist_ok=True, parents=True)

        # Preprocess via SASS.
        try:
            subprocess.run(['sass', src_file, target_path])
        except FileNotFoundError as e:
            err_msg: str = ('sass not found. Make sure Sass is '
                            'installed and in your PATH. Build cancelled')
            raise BuildException(err_msg)

        if mode == 'production':
            # Minify.
            with open(target_path) as css_file:
                css_src: str = css_file.read()

            minified_css: str = rcssmin.cssmin(css_src)
            with open(target_path, 'w') as css_file:
                css_file.write(minified_css)

    # Copy assets.
    src_assets_dir: Path = Path(toolconfig.assets_folder['folder'])
    shutil.copytree(src_assets_dir, assets_dir, dirs_exist_ok=True)


def _serve(base_dist_dir: Path=Path('dist')):
    logger: logging.Logger = logging.getLogger('tool.py')

    try:
        _build(base_dist_dir)
    except BuildException as e:
        logger.warning(f'{e}. Previously built files will be served.')

    # Set up watch list.
    watch_list: list[str] = []
    for html_file in toolconfig.routes.values():
        watch_list.append(html_file)

    for processed_file in toolconfig.processed_files.values():
        watch_list.append(processed_file)

        nested_imports: set[Path] = _find_scss_imports(Path(processed_file))
        for path in nested_imports:
            watch_list.append(os.path.normpath(str(path)))

    assets_folder_path: str = toolconfig.assets_folder['folder']
    assets_folder_path = assets_folder_path.strip('/')
    assets_folder_path += '/**/*.*'
    watch_list.append(assets_folder_path)

    # Set up basic server.
    def build():
        _build(base_dist_dir, 'development')

    server: livereload.Server = livereload.Server()
    for path in watch_list:
        delay: int | None = None
        if '.scss' in path:
            delay = 5

        server.watch(path, build, delay=delay)

    host: str = 'localhost'
    port: int = 2016
    root: str = 'dist/'

    logger.info(f'Starting server at http://{host}:{port}...')
    server.serve(host=host, port=port, root=root)


def _find_scss_imports(starting_file: Path) -> set[Path]:
    imported_files: set[Path] = set()
    with open(starting_file) as f:
        for line in f.readlines():
            if '@import' in line:
                imported_file: str = line.replace('@import', '')
                imported_file = imported_file.strip().strip(';')
                imported_file = imported_file.strip('\'').strip('\"')
                imported_file = starting_file.parent / imported_file
                imported_files.add(imported_file)

                # DIG DEEPERRR! RAAGHHH! RECURSION TIME!
                imported_files.update(_find_scss_imports(Path(imported_file)))

    return imported_files


if __name__ == '__main__':
    logger: logging.Logger = _setup_logger('tool.py')

    parser: argparse.ArgumentParser = _create_parser()
    args: argparse.Namespace = parser.parse_args()
    
    if args.task == 'build':
        try:
            _build()
        except BuildException as e:
            logger.error(f'{str(e)}.')
            sys.exit(127)
    elif args.task == 'serve':
        _serve()