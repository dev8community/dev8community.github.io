import argparse
import functools
import http.server
import logging
import os
import socketserver
import shutil

from pathlib import Path

import toolconfig


def _create_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog='tool.py',
        description='A utility for building the temporary Dev8 website.')
    parser.add_argument('task', choices=['build', 'serve'])

    return parser


def _build(base_dist_dir=Path('dist')):
    os.makedirs(base_dist_dir, exist_ok=True)

    for route, html_file in toolconfig.page_routes.items():
        route: str = route.strip('/')  # Having '/' at the start messes up Path.

        src: Path = html_file
        dest: Path = base_dist_dir / route / 'index.html'
        
        dest.parent.mkdir(exist_ok=True, parents=True)

        shutil.copy(src, dest)


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
