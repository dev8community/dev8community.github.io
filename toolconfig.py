# JSON data that will be loaded into the template engine.
# The key will be used as the name that is accessible from the templates,
# and the value will be the source file.
data = {
    'primary_languages': 'data/surveys/evtss2023/primary-languages.json'
}

# Routes that we can access in the URL. Paths are
# relative to tool.py.
# TODO: Add support for routes leading to files.
routes = {
    '/': 'pages/index.html',
    '/surveys/evtss2023': 'pages/surveys/evtss2023/index.html'
}

# Processed files are files that are processed from a source file,
# such as an SCSS file.The processed filename should be a path
# relative to the assets folder in dist/. The source file should
# be relative to tool.py. For now, we only support processing SCSS
# files into CSS files.
processed_files = {
    'surveys/evtss2023/css/index.css': 'src/scss/surveys/evtss2023/index.scss'
}

# The folder where all static assets are stored that wlll
# be distributed. The folder contents will be copied into
# an 'assets' folder in dist/.
assets_folder = {
    'folder': 'assets/'
}
