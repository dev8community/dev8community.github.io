import argparse


def _create_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog='tool.py',
        description='A utility for building the temporary Dev8 website.')
    parser.add_argument('task', choices=['build', 'serve'])

    return parser


def _build():
    pass


def _serve():
    pass


if __name__ == '__main__':
    parser: argparse.ArgumentParser = _create_parser()
    parser.parse_args()
    print(parser)
