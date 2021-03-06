// ============================================================================
// This file contains constant values that define the memory map of the
// WebAssembly code.

// ============================================================================
// Virtual machine memory
export const VM_MEMORY = 0x00_0000

// ============================================================================
// Z80-specific memory map

// --- Register area
export const REG_AREA_INDEX = 0x0120_0E00;

// --- Machine state trasnfer buffer
export const STATE_TRANSFER_BUFF = 0x0120_0E60;

// ============================================================================
// Generic virtual machine engine memory map

// --- Map of breakpoints, 1 bit for each 16-bit address
export const BREAKPOINT_MAP = 0x0120_2000;

// --- Map of breakpoint pages, 8-bit for each 16-bit address
export const BREAKPOINT_PAGES_MAP = 0x0120_4000;

// --- Map of memory write operations, 1 bit for each 16-bit address
export const MEMWRITE_MAP = 0x0121_4000;

// --- Map of code read operations, 1 bit for each 16-bit address
export const CODE_READ_MAP = 0x0121_6000;

// --- Map of memory read operations, 1 bit for each 16-bit address
export const MEMREAD_MAP = 0x0121_8000;

// --- Step-out operation stack
export const STEP_OUT_STACK = 0x0121_A000;

// ============================================================================
// Z80 test machine memory map

// --- Input buffer for the Z80 IN instructions
export const TEST_INPUT_OFFS = 0x0122_0000;

// --- Memory operations log buffer
export const TEST_MEM_LOG_OFFS = 0x0122_0100;

// --- I/O operations log buffer
export const TEST_IO_LOG_OFFS = 0x0122_0500;

// --- TBBlue NEXTREG operations log buffer
export const TEST_TBBLUE_LOG_OFFS = 0x0122_0900;

// ============================================================================
// ZX Spectrum memory map

// --- Offset address for bank 0
export const BANK_0_OFFS = 0x00_0000;

// --- ZX Spectrum 48 ROM offset
export const ROM_48_OFFS = 0x02_0000;

// --- ZX Spectrum 128 ROM 0 offset
export const ROM_128_0_OFFS = 0x02_4000;

// --- 8K page indexes
export const BLOCK_LOOKUP_TABLE = 0x0121_A400;

// --- Pixel rendering buffer
export const PIXEL_RENDERING_BUFFER = 0x0129_4700;

// --- Colorization buffer
export const COLORIZATION_BUFFER = 0x012B_C700;

// --- Beeper samples
export const BEEPER_SAMPLE_BUFFER = 0x0135_C700;

// --- AY PSG chip samples
export const PSG_SAMPLE_BUFFER = 0x0135_E700;

// --- Tape LOAD buffer
export const TAPE_DATA_BUFFER = 0x0136_0700;

// --- Tape SAVE buffer
export const TAPE_SAVE_BUFFER = 0x0140_0700;

// --- The beginning of the rendering tact table
export const RENDERING_TACT_TABLE = 0x0122_0200;

// --- The beginning of the PSG envelope table
export const PSG_ENVELOP_TABLE = 0x0140_4C00;

// ============================================================================
// Cambridge Z88 memory map

// --- Z88 memory area
export const Z88_MEM_AREA = 0x00_0000;

// --- Z88 pixel buffer area
export const PIXEL_BUFFER = 0x0122_0300;
