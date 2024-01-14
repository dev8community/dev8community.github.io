import argparse
import functools
import http.server
import logging
import os
import socketserver
import sys
import shutil
import subprocess

from pathlib import Path

import toolconfig


def _create_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog='tool.py',
        description='A utility for building the temporary Dev8 website.')
    parser.add_argument('task', choices=['build', 'serve'])

    return parser


def _setup_logger():
    pass


def _build(base_dist_dir=Path('dist')):
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
            subprocess.run(['scss', src_file, target_path])
        except FileNotFoundError as e:
            pass

        # Minify.
        # Save file.


def _serve(base_dist_dir=Path('dist')):
    _build(base_dist_dir)

    # Set up basic server.
    handler = functools.partial(http.server.SimpleHTTPRequestHandler,
                                directory=base_dist_dir)
    httpd: socketserver.TCPServer = socketserver.TCPServer(('localhost', 2016),
                                                           handler)
    httpd.allow_reuse_address = True
    
    httpd.serve_forever()
    httpd.server_close()


if __name__ == '__main__':
    parser: argparse.ArgumentParser = _create_parser()
    args: argparse.Namespace = parser.parse_args()
    
    if args.task == 'build':
        _build()
    elif args.task == 'serve':
        _serve()
