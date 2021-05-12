export const LIGHT_GRAY = "#e9ecef"; //lighter
export const WHITE = "white";
export const BLUE = "#123abc";
export const GREEN = "green";
export const RED = "red";
export const ALLEGRO_ORANGE = "#ff5a00";
export const accentColor = "#5cb7b7";
export const PRODUCT_MENU_BG_COLORS = [LIGHT_GRAY, "lightsteelblue", "antiquewhite", "beige", "lightblue", "cornsilk", "aliceblue", "thistle"]

export const TEXT_EMPTY = "";

//General config parameters
export const PARTICIPANTS_PER_SEX_PER_GROUP_LIMIT = 30;
export const YEARS_EDUCATION_LIMIT = 11;
export const PARTICIPANTS_PER_SCENARIO_PER_GROUP_LIMIT = 30;
export const PARTICIPANTS_GROUPS = [
    { minAge: 19, maxAge: 30 },
    { minAge: 42, maxAge: 53 },
    { minAge: 65, maxAge: 76 }
]

//Visual Pattern
export const VISUAL_PATTERN = "VisualPattern"
export const TILE_SUCCESS = 1;
export const TILE_EMPTY = 0;
export const TILE_ERROR = 2;
export const TILE_LEFT = 3;
export const VISUAL_PATTERN_DIMENTION = [
    [3, 3, 5], //row, column, amount of blue squares
    [3, 4, 6],
    [4, 4, 8],
    [4, 5, 10],
    [5, 5, 12]
];
export const VISUAL_PATTERN_DEMO_DIMENTION = [
    [2, 2, 3], //row, column, amount of blue squares
    [2, 3, 4]
];
export const VISUAL_PATTERN_TIMESCREEN_SECS = 2;
export const VISUAL_PATTERN_RETRY_ATTEMPTS = 2;
export const VISUAL_PATTERN_DEMO_RETRY_ATTEMPTS = 1;

//SYNC
export const STATE_SYNCING = 2;
export const STATE_SYNC = 1;
export const STATE_NOT_SYNC = 0;
export const SYNC_AMOUN_ITEMS = 5;
export const ONE_SECOND_MS = 1000;

// Form IDs
export const FORM_SEX_ID = "radioSex";
export const FORM_AGE_ID = "age";
export const FORM_PROFESSION_ID = "profession";
export const FORM_YEARS_EDUC_ID = "yearsEduc";
export const FORM_LEVEL_EDUC_ID = "levelEducationSelect";
export const FORM_AGE_TITLE = "Age";
export const FORM_PROFESSION_TITLE = "Profession";
export const FORM_YEARS_EDUC_TITLE = "Number of years of formal education";
export const FORM_YEARS_EDUC_TITLE_DESC = "(ended with a certificate or a diploma only: e.g., 8 years of primary school + 4 years of high school = 12 years)"
export const FORM_LEVEL_EDUC_TITLE = "Level of education";
export const FORM_SEX_TITLE = "Sex (M/F)";
export const FORM_LEVEL_EDUC_DEFAULT = "Select...";
export const FORM_LEVEL_EDUC_INITIAL = "Primary";
export const FORM_LEVEL_EDUC_MIDDLE = "Secondary";
export const FORM_LEVEL_EDUC_SUPERIOR = "Higher";
export const FEMALE_VALUE = "F";
export const MALE_VALUE = "M";

//Footer
export const TEXT_FOOTER = "Press SPACEBAR to continue";
export const TEXT_FOOTER_ENTER = "Press ENTER to continue";

//RATING bar
export const INACTIVE_STAR = '#d1d1cf';
export const ACTIVE_STAR = '#bf162e'; //Yellow: #ffd700
export const HIDDEN_STAR = '#ffffff';

//FONT SIZES
export const FONT_SIZE_HEADING1 = "HEADING 1";
export const FONT_SIZE_HEADING2 = "HEADING 2";
export const FONT_SIZE_HEADING3 = "HEADING 3";
export const FONT_SIZE_HEADING4 = "HEADING 4";
export const FONT_SIZE_HEADING5 = "HEADING 5";
export const FONT_SIZE_HEADING6 = "HEADING 6";

//PSFORM
export const INPUT_TYPE = "input";
export const MULTIPLE_CHOICES_TYPE = "multiple_choice";

//keyboard related
export const SPACE_KEY_CODE = 32;
export const ENTER_KEY_CODE = 13;
export const EVENT_KEY_DOWN = "keydown";
export const EVENT_BEFORE_UNLOAD = "beforeunload";
export const EVENT_UNLOAD = "unload";

//screen names
export const USER_INFO_SCREEN = "UserInfo";
export const USER_FORM_SCREEN = "UserForm";
export const INSTRUCTION_SCREEN = "Instruction";
export const PSFORM_SCREEN = "PsychologyForm";
export const VISUAL_PATTERN_SCREEN = "VisualPatternTask";
export const VISUAL_PATTERN_DEMO_SCREEN = "VisualPatternTaskDemo";
export const BARGAIN_DEMO_INSTRUCTION_COND1 = "BargainDemoTaskInstructionCond1";
export const BARGAIN_DEMO_INSTRUCTION_COND2 = "BargainDemoTaskInstructionCond2";
export const BARGAIN_DEMO_SCREEN = "BargainDemoTask";
export const BARGAIN_DEMO_INSTRUCTION_BEFORE_FINISH = "BargainDemoTaskInstructionBeforeFinish";
export const BARGAIN_DEMO_FINISH_INSTRUCTION = "BargainDemoTaskInstructionFinish";
export const BARGAIN_SCREEN = "BargainTask";

export const STORES_SHORT_TYPE = "Stores-short";
export const STORES_LONG_TYPE = "Stores-long";

//App versions
export const EXPERIMENT_TYPE_LONG = "LONG-SHORT"
export const EXPERIMENT_TYPE_SHORT = "SHORT-LONG"
export const EXPERIMENT_TYPE_LONG_NT = "LONG-SHORT-NT"
export const EXPERIMENT_TYPE_SHORT_NT = "SHORT-LONG-NT"

//General App messages KEYS
export const FORM_AGE_ALERT_ERROR = "The Age field cannot be left blank.";//Age field cannot be empty
export const FORM_YEARS_EDUC_ALERT_ERROR = "The Years of Formal Education field cannot be left blank.";//Years Education field cannot be empty!
export const FORM_PROFESSION_ALERT_ERROR = "The Profession field cannot be left blank.";//Profession field cannot be empty!
export const FORM_SEX_ALERT_ERROR = "The Sex field cannot be left blank.";//Age field cannot be empty
export const FORM_EDUC_LEVEL_ALERT_ERROR = "Please select your Level of education.";//You need to select an education level
export const PSFORM_SELECT_ALERT_ERROR = "First you need to answer all the questions.";//You need to complete the questions first!
export const PARTICIPANTS_QUOTA_FULL_ALERT_ERROR = "We are sorry, but unfortunately you do not meet all the conditions for participating in the study or the number of eligible participants is exceeded."; //We are sorry, but unfortunately you do not meet all the conditions for participating in the study or the number of eligible participants is already exceeded
export const SESSION_TIMEOUT_MESSAGE = "The session has been closed due to the passage of time;";
export const VISUAL_PATTERN_RESULTS_PRESS_SPACE = "Press SPACEBAR to go to the next board.";
export const VISUAL_PATTERN_RESULTS_FAILED = "Unfortunately, you did not manage to select all the boxes correctly.";
export const VISUAL_PATTERN_RESULTS_CORRECT = "Bravo! You have successfully checked all the boxes.";
export const VISUAL_PATTERN_TEXT_START_PRESS_SPACE = "Press the spacebar to submit your solution.";
export const VISUAL_PATTERN_INSTRUCTION = "Try to recreate the pattern displayed on the previous screen. You select and deselect the boxes by clicking on them with the left mouse button.";

export const BARGAIN_CORRECT_SELECTED_ALERT_MESSAGE = (bargainCounter) => { return `${bargainCounter} bargains in basket.` }
export const BARGAIN_ERROR_SELECTED_ALERT_MESSAGE = "This is not a bargain."
export const BARGAIN_MISSED_SELECTED_ALERT_MESSAGE = (numberOfBargain) => { return `${numberOfBargain} missed bargains.` }

export const STORES_NOT_AVAILABLE = "No more stores available. Please wait."
export const MIDDLE_EXPERIMENT_ALERT = "We reached the middle of the experiment. Now the list will change. Click to continue to the next part of the experiment."

export const TOUR_PRODUCT_BELT = "This is the product belt."
export const TOUR_BARGAIN = "This is a bargain."
export const TOUR_NOT_BARGAIN = "This is not a bargain."
export const TOUR_BARGAIN_CRITERIA = "A bargain is a product with a discount >= 50% and rating >= 4 stars."
export const TOUR_BARGAIN_SELECTION = "Select the bargain clicking your left mouse button."