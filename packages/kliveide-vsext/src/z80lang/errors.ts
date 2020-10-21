/**
 * Error message type description
 */
type ErrorText = { [key: string]: string };

/**
 * DEscribes the structure of error messages
 */
export interface ParserErrorMessage {
  code: ErrorCodes;
  text: string;
  position: number;
  line: number;
  column: number;
}

export type ErrorCodes =
  | "Z1001"
  | "Z1002"
  | "Z1003"
  | "Z1004"
  | "Z1005"
  | "Z1006"
  | "Z1007"
  | "Z1008"
  | "Z1009"
  | "Z1010"
  | "Z1011"
  | "Z1012"
  | "Z1013"
  | "Z1014"
  | "Z1015"
  | "Z1016"
  | "Z1017"
  | "Z1018"
  | "Z1019"
  | "Z1020"
  | "Z1021"
  | "Z1022"
  | "Z1023"
  | "Z1024"

  | "Z2000"
  | "Z2001"
  | "Z2002"
  | "Z2003"
  | "Z2004"
  | "Z2005"
  | "Z2006"
  | "Z2007"
  | "Z2008"
  | "Z2009"
  | "Z2010"
  | "Z2011"
  | "Z2012"
  | "Z2013"
  | "Z2014"
  | "Z2015"
  | "Z2016"
  | "Z2017"
  | "Z2018"
  | "Z2019"
  | "Z2020"
  | "Z2021"
  | "Z2022"
  | "Z2023"
  | "Z2024"
  | "Z2025"
  | "Z2026"
  | "Z2027"
  | "Z2028"
  | "Z2029"
  | "Z2030"
  | "Z2031"
  | "Z2032"
  | "Z2033"
  | "Z2034"
  | "Z2035"
  | "Z2036"
  | "Z2037"
  | "Z2038"
  | "Z2039"
  | "Z2040"
  | "Z2041"
  | "Z2042"
  | "Z2043"
  | "Z2044"
  | "Z2045"
  | "Z2046"
  | "Z2047"
  | "Z2048"
  | "Z2049"
  | "Z2050"
  | "Z2051"
  | "Z2052"
  | "Z2053"
  | "Z2054"
  | "Z2055"
  | "Z2056"
  | "Z2057"
  | "Z2058"
  | "Z2059"
  | "Z2060"
  | "Z2061"
  | "Z2062"
  | "Z2063"
  | "Z2064"
  | "Z2065"
  | "Z2066"
  | "Z2067"
  | "Z2068"
  | "Z2069"
  | "Z2070"
  | "Z2071"
  | "Z2072"
  | "Z2073"
  | "Z2074"
  | "Z2075"
  | "Z2076"
  | "Z2077"
  | "Z2078"
  | "Z2079"
  | "Z2080"
  | "Z2081"
  | "Z2082"
  | "Z2083"
  | "Z2084"
  | "Z2085"
  | "Z2086"
  | "Z2087"
  | "Z2088"
  | "Z2089"
  | "Z2090"
  | "Z2091"

  | "Z3000"
  | "Z3001"

  | "Z4000"

  | "Z5000"
  | "Z5001"
  | "Z5002";

export const errorMessages: ErrorText = {
  Z1001: "Invalid token at the end of the line: {0}",
  Z1002: "A line cannot start with this token: {0}",
  Z1003: "An expression expected",
  Z1004: "An identifier expected",
  Z1005: "Cannot parse an integer literal",
  Z1006: "A string literal expected",
  Z1007: "A comma expected",
  Z1008: "DE register expected",
  Z1009: "B register expected",
  Z1010: "A register expected",
  Z1011: "D register expected",
  Z1012: "E register expected",
  Z1013: "'(' expected",
  Z1014: "')' expected",
  Z1015: "'}}' expected",
  Z1016: "Operand expected",
  Z1017: "Invalid token at the start of the line: {0}",
  Z1018: "An identifier or symbol expected",
  Z1019: "'=' expected",
  Z1020: "'to' expected",
  Z1021: "A byte-emitting pragma expected",
  Z1022: "BC, DE, HL, or SP expected",
  Z1023: "A mnemonic, a register, or a register indirection expression expected.",
  Z1024: "The lreg and hreg functions accept only a bc, de, hl, ix, or iy as their argument.",

  Z2000: "The current assembly address overflew $FFFF",
  Z2001: "The emitted code overflows the segment/bank.",
  Z2002: "The .ZXBASIC pragma should be used before any other pragma or instruction.",
  Z2003: "Missing #endif directive",
  Z2004: "Cannot find include file: '{0}'",
  Z2005: "Include file '{0}' is included more than once into the same parent source file",
  Z2006: "Include file '{0}' causes circular file reference",
  Z2007: "Error reading include file: '{0}' ({1})",
  Z2008: "An #ifmod or #ifnmod directive cen be used only with these identifiers: 'SPECTRUM48', 'SPECTRUM128', 'SPECTRUMP3', 'NEXT'.",
  Z2009: "Unexpected #else directive",
  Z2010: "Unexpected #endif directive",
  Z2011: "A .model pragma can be used only once.",
  Z2012: "A .model pragma can have only these values: 'SPECTRUM48', 'SPECTRUM128', 'SPECTRUMP3', 'NEXT'.",
  Z2013: "The .struct size of {0} is {1} byte(s). The invocation wants to emit {2} bytes.",
  Z2014: "The .struct definition of {0} does not have a field named {1}.",
  Z2015: "Field assignment instruction cannot be used outside of .struct invocation.",
  Z2016: "An .equ pragma must have a label",
  Z2017: "Label '{0}' is already defined",
  Z2018: "The .bank pragma cannot have a label.",
  Z2019: "The .bank pragma's value must be between 0 and 7.",
  Z2020: "The .bank pragma's offset value must be between 0 and #03fff.",
  Z2021: "The .bank pragma cannot be used with the ZX Spectrum 48 model type.",
  Z2022: "You have already used the .bank pragma for bank {0}.",
  Z2023: "Unexpected error when emitting code for mnemonic '{0}'.",
  Z2024: "Only one .xorg pragma can be used within a code segment.",
  Z2025: "The {0} pragma can be used only in the global scope.",
  Z2026: "A .var pragma must have a label",
  Z2027: "A .var pragma cannot redefine a non-.var-created symbol",
  Z2028: ".skip to {0} is invalid, as this address is less then the current address, {1}",
  Z2029: "A string value is used where a numeric value is expected.",
  Z2030: ".defm/.defn pragma requires a string argument.",
  Z2031: ".defh pragma requires a string argument.",
  Z2032: ".defh pragma requires a string with even hexadecimal digits.",
  Z2033: ".align pragma must be used with a parameter value between 1 and #4000; {0} is an invalid value.",
  Z2034: ".includebin pragma requires a string argument.",
  Z2035: "An integral value is expected." ,
  Z2036: "Invalid .includebin offset value (negative, or greater than the file length).",
  Z2037: "Invalid .includebin length value (negative, or segment exceends the file length).",
  Z2038: "Cannot open file '{0}' used in .includebin pragma ({0}).",
  Z2039: "Emitting the .includebin segment would overflow the current segment.",
  Z2040: ".defgx pragma requires a string argument.",
  Z2041: "Cannot use an empty pattern with .defg/.defgx pragma.",
  Z2042: "A numeric expression expected.",
  Z2043: "Invalid operand",
  Z2044: "The jr instructions cannot be used with the pe, po, p, or m conditions.",
  Z2045: "Relative jump distance should be between -128 and 127. {0} is invalid.",
  Z2046: "The rst instruction can be used only with #00, #08, #10, #18, #20, #28, #30, or #38 arguments. #{0} is invalid.",
  Z2047: "Interrupt mode can only be 0, 1, or 2. '{0}' is invalid.",
  Z2048: "Output value can only be 0",
  Z2049: "Bit index should be between 0 and 7. '{0}' is invalid",
  Z2050: "The first operand must be 'a' when using the two-argument form of the ALU operation.",
  Z2051: "The first argument of an 8-bit ALU operation can only be 'a'.",
  Z2052: "Missing end statement for {0}.",
  Z2053: "Loop counter cannot be greater than 65535 (#FFFF).",
  Z2054: "Too many errors detected while compiling a loop, further processing aborted.",
  Z2055: "Orphan '{0}' statement found without a corresponding '{1}' statement.",
  Z2056: "$CNT cannot be used outside of loop constructs.",
  Z2057: "The .step value in a .for-loop cannot be zero.",
  Z2058: "Variable {0} is already declared, it cannot be used as a .for-loop variable again.",
  Z2059: ".break cannot be used outside of loop constructs.",
  Z2060: ".continue cannot be used outside of loop constructs.",
  Z2061: "The {0} section in .if/.ifused/.ifnused cannot have a label.",
  Z2062: ".if/.ifused/.ifnused cannot have an {0} section after a detected .else section.",
  Z2063: "You cannot define a local symbol with a temporary name ({0}).",
  Z2064: "This local symbol is already declared: ({0}).",
  Z2065: ".local can be used only within .proc",
  Z2066: "You cannot define a module without a name.",
  Z2067: "You cannot define a module with a temporary name ({0}).",
  Z2068: "Module with name '{0}' already exists.",
  Z2069: "You cannot define a struct without a name.",
  Z2070: "You cannot define a struct with a temporary name ({0}).",
  Z2071: "Structure name '{0}' has already been declared.",
  Z2072: "The .ends statement cannot have a label.",
  Z2073: "Structures can use only pragmas that emit bytes, words, strings, or reserve space.",
  Z2074: "Duplicated field label {0} in a .struct definition.",
  Z2075: "Duplicated .macro argument: {0}.",
  Z2076: "You cannot define a macro without a name.",
  Z2077: "You cannot define a macro with a temporary name ({0}).",
  Z2078: "Macro name '{0}' has already been declared.",
  Z2079: "Macro definition cannot be nested into another macro definition.",
  Z2080: "Unknown macro argument ('{0}') is used in a macro definition.",
  Z2081: "The .comparebin pragma expects a string as its first argument.",
  Z2082: "Invalid .comparebin offset value (negative, or greater than the file length).",
  Z2083: "Invalid .comparebin length value (negative, or segment exceends the file length).",
  Z2084: "Cannot open file '{0}' used in .comparebin pragma ({1}).",
  Z2085: ".comparebin fails: {0}.",
  Z2086: "A .struct invocation ({0}) cannot have arguments.",
  Z2087: "Unknown macro: {0}.",
  Z2088: "The declaration of macro {0} contains {1} argument(s), but it is invoked with more parameters ({2}).",
  Z2089: "A macro-time function accepts only macro parameters.",
  Z2090: "Cannot pass a macro parameter template in a macro argument.",
  Z2091: "Macro parameter can only be used within a macro declaration.",

  Z3000: "Identifier '{0}' is not defined yet.",
  Z3001: "Expression evaluation error: {0}",
  Z4000: "ERROR: {0}",

  Z5000: "The pop instruction cannot be used with an expression operand",
  Z5001: "To use this Spectrum Next-specific instruction, you need to set .model type to NEXT explicitly.",
  Z5002: "The push and pop instructions can use only these registers: af, bc, de, hl, ix, and iy.",
};
