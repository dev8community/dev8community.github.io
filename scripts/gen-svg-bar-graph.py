# A quick and dirty script designed to generate SVG bar graphs from a JSON
# file.
import argparse
import json

def _create_parser() -> argparse.ArgumentParser:
    parser: argparse.ArgumentParser = argparse.ArgumentParser(
        prog='gen-svg-bar-graph.py',
        description=(
            'Generate code for a collection of SVG bar '
            'graphs from a JSON file.'
        ))
    parser.add_argument('data_set_file')
    return parser


def generate_svg_graphs(data_set: dict) -> str:
    num_units: int = data_set['num_units']
    code: str = ''
    for label, raw_count in data_set['data']:
        percentage: float = (raw_count / num_units) * 100

        if raw_count > 0:
            bar_width: str = f'{percentage:.2f}%'
        else:
            bar_width: str = '2px'

        threshold: float = 20.0
        if percentage > threshold:
            text_x_pos: float = percentage - 1.0
        elif raw_count == 0:
            text_x_pos: float = 2.0
        else:
            text_x_pos: float = percentage + 1.0

        text_anchor: str = 'end' if percentage > threshold else 'start'
        fill_colour: str = '#212121' if percentage > threshold else '#ffffff'
        code += (
            '<li>\n'
            f'    <div class="label">{label}</div>\n'
            '    <div class="bar">\n'
            '        <svg width="100%" height="24">\n'
            f'            <rect class="bar-rect" y="0" width="{bar_width}" height="24" rx="3" ry="3"/>\n'
            f'            <text x="{text_x_pos}%" y="12" fill={fill_colour} text-anchor="{text_anchor}" alignment-baseline="central">{percentage:.2f}%</text>\n'
            '        </svg>\n'
            '    </div>\n'
            '</li>\n'
        )
    
    return code


if __name__ == '__main__':
    parser: argparse.ArgumentParser = _create_parser()
    args: argparse.Namespace = parser.parse_args()

    with open(args.data_set_file) as f:
        data_set: dict = json.load(f)

    print(generate_svg_graphs(data_set), end='')
