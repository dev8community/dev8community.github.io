# JSON data that will be loaded into the template engine.
# The key will be used as the name that is accessible from the templates,
# and the value will be the source file.
data = {
    'primary_languages': 'data/surveys/evtss2023/primary-languages.json',
    'languages_used': 'data/surveys/evtss2023/languages-used.json',
    'frameworks_used': 'data/surveys/evtss2023/frameworks-used.json',
    'tools_used': 'data/surveys/evtss2023/tools-used.json',
    'ides_used': 'data/surveys/evtss2023/ides-used.json',
    'databases_used': 'data/surveys/evtss2023/databases-used.json',
    'cloud_platforms_used': 'data/surveys/evtss2023/cloud-platforms-used.json',
    'work_management_used': 'data/surveys/evtss2023/work-management-used.json',
    'communication_tools_used': 'data/surveys/evtss2023/communication-tools-used.json',
    'software_being_developed': 'data/surveys/evtss2023/software-being-developed.json',
    'target_platforms': 'data/surveys/evtss2023/target-platforms.json',
    'personal_description': 'data/surveys/evtss2023/personal-description.json',
    'developer_type': 'data/surveys/evtss2023/developer-type.json',
    'length_of_programming_experience': 'data/surveys/evtss2023/length-of-programming-experience.json',
    'length_of_professional_programming_experience': 'data/surveys/evtss2023/length-of-professional-programming-experience.json',
    'length_of_programming_experience_by_developer_type': 'data/surveys/evtss2023/length-of-programming-experience-by-developer-type.json',
    'length_of_professional_programming_experience_by_developer_type': 'data/surveys/evtss2023/length-of-professional-programming-experience-by-developer-type.json',
    'developer_activities': 'data/surveys/evtss2023/developer-activities.json',
    'location': 'data/surveys/evtss2023/location.json',
    'gender': 'data/surveys/evtss2023/gender.json',
    'age': 'data/surveys/evtss2023/age.json',
    'hometown': 'data/surveys/evtss2023/hometown.json',
    'hometown_to_location': 'data/surveys/evtss2023/hometown-to-location.json',
    'educational_attainment': 'data/surveys/evtss2023/educational-attainment.json',
    'college_alma_mater': 'data/surveys/evtss2023/college-alma-mater.json',
    'degree_programme': 'data/surveys/evtss2023/degree-programme.json',
    'academic_learning_satisfaction': 'data/surveys/evtss2023/academic-learning-satisfaction.json',
    'computer_used_most_of_the_time': 'data/surveys/evtss2023/computer-used-most-of-the-time.json',
    'pc_specs': 'data/surveys/evtss2023/pc-specs.json',
    'pc_os': 'data/surveys/evtss2023/pc-os.json',
    'mac_models': 'data/surveys/evtss2023/mac-models.json',
    'mac_os': 'data/surveys/evtss2023/mac-os.json',
    'tablets': 'data/surveys/evtss2023/tablets.json',
    'occupation': 'data/surveys/evtss2023/occupation.json',
    'employer_location': 'data/surveys/evtss2023/employer-location.json',
    'employment_arrangement': 'data/surveys/evtss2023/employment-arrangement.json',
    'annual_income_range': 'data/surveys/evtss2023/annual-income-range.json',
    'annual_income_satisfaction': 'data/surveys/evtss2023/annual-income-satisfaction.json',
    'academic_arrangement': 'data/surveys/evtss2023/academic-arrangement.json',
    'ai_search_tools_used': 'data/surveys/evtss2023/ai-search-tools-used.json',
    'ai_developer_tools_used': 'data/surveys/evtss2023/ai-developer-tools-used.json',
    'ai_datasets_opinion': 'data/surveys/evtss2023/ai-datasets-opinion.json',
    'ai_art_opinion': 'data/surveys/evtss2023/ai-art-opinion.json',
    'ai_code_generation_opinion': 'data/surveys/evtss2023/ai-code-generation-opinion.json',
    'local_cs_it_sentiments': 'data/surveys/evtss2023/local-cs-it-sentiments.json',
    'desired_tech_events_in_the_region': 'data/surveys/evtss2023/desired-tech-events-in-the-region.json',
    'desired_tech_event_topics': 'data/surveys/evtss2023/desired-tech-event-topics.json',
    'survey_length': 'data/surveys/evtss2023/survey-length.json',
    'survey_difficulty': 'data/surveys/evtss2023/survey-difficulty.json',
    'event_food_and_drinks': 'data/surveys/evtss2023/event-food-and-drinks.json',
    'event_locations': 'data/surveys/evtss2023/event-locations.json'
}

# Routes that we can access in the URL. Paths are
# relative to tool.py.
# TODO: Add support for routes leading to files.
routes = {
    '/': 'pages/index.html',
    '/surveys/evtss2023': 'pages/surveys/evtss2023/index.html',
    '/surveys/evtss2023/technologies': 'pages/surveys/evtss2023/technologies.html',
    '/surveys/evtss2023/development': 'pages/surveys/evtss2023/development.html',
    '/surveys/evtss2023/developer-profile': 'pages/surveys/evtss2023/developer-profile.html',
    '/surveys/evtss2023/work-and-academics': 'pages/surveys/evtss2023/work-and-academics.html'
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
