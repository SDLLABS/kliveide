;; ==========================================================================
;; Common mappings for all machine types

;; ----------------------------------------------------------------------------
;; Memory area reserved for all Z80-based virtual machines (16MB)
(global $VM_MEMORY i32 (i32.const 0x0000_0000))

;; ----------------------------------------------------------------------------
;; CPU diagnostics area

;; Memory write information map (64K x 2 bytes)
(global $MEM_WR_MAP i32 (i32.const 0x0100_0000))

;; Memory read information map (64K x 2 bytes)
(global $MEM_RD_MAP i32 (i32.const 0x0102_0000))

;; Instruction read information map (64K x 2 bytes)
(global $INSTR_RD_MAP i32 (i32.const 0x0104_0000))

;; ----------------------------------------------------------------------------
;; Breakpoints area

;; Breakpoints map (64K x 1 byte)
(global $BREAKPOINTS_MAP i32 (i32.const 0x0106_0000))

;; Breakpoint partitions map (64K x 2 bytes)
(global $BRP_PARTITION_MAP i32 (i32.const 0x0107_0000))

;; Memory read breakpoints conditions map (64K x 5 bytes)
(global $MEM_RD_CONDITIONS_MAP i32 (i32.const 0x0109_0000))

;; Memory write breakpoints conditions map (64K x 5 bytes)
(global $MEM_WR_CONDITIONS_MAP i32 (i32.const 0x010E_0000))

;; I/O breakpoints condition map (64K x 1 byte)
(global $IO_INDEX_MAP i32 (i32.const 0x0113_0000))

;; I/O breakpoints (32 x 15 bytes)
(global $IO_BREAKPOINTS i32 (i32.const 0x0114_0000))

;; ----------------------------------------------------------------------------
;; Z80 CPU Area

;; Z80 ALU Helper tables

;; INC flags table (256 bytes)
(global $INC_FLAGS i32 (i32.const 0x0120_0000))

;; DEC flags table (256 bytes)
(global $DEC_FLAGS i32 (i32.const 0x0120_0100))

;; Logic operations flags table (256 bytes)
(global $LOG_FLAGS i32 (i32.const 0x0120_0200))

;; RLC flags table (256 bytes)
(global $RLC_FLAGS i32 (i32.const 0x0120_0300))

;; RRC flags table (256 bytes)
(global $RRC_FLAGS i32 (i32.const 0x0120_0400))

;; RL flags (no carry) table (256 bytes)
(global $RL0_FLAGS i32 (i32.const 0x0120_0500))

;; RL flags (carry set) table (256 bytes)
(global $RL1_FLAGS i32 (i32.const 0x0120_0600))

;; RR flags (no carry) table (256 bytes)
(global $RR0_FLAGS i32 (i32.const 0x0120_0700))

;; RR flags (carry set) table (256 bytes)
(global $RR1_FLAGS i32 (i32.const 0x0120_0800))

;; SRA flags table (256 bytes)
(global $SRA_FLAGS i32 (i32.const 0x0120_0900))

;; SZ53 flags table (256 bytes)
(global $SZ53_FLAGS i32 (i32.const 0x0120_0A00))

;; SZ53P flags table (256 bytes)
(global $SZ53P_FLAGS i32 (i32.const 0x0120_0B00))

;; Parity table (256 bytes)
(global $PAR_FLAGS i32 (i32.const 0x0120_0C00))

;; Overflow ADD table (8 bytes)
(global $OVF_ADD i32 (i32.const 0x0120_0D00))

;; Overflow SUB table (8 bytes)
(global $OVF_SUB i32 (i32.const 0x0120_0D10))

;; Half-carry ADD table (8 bytes)
(global $HC_ADD i32 (i32.const 0x0120_0D20))

;; Half-carry SUB table (8 bytes)
(global $HC_SUB i32 (i32.const 0x0120_0D30))

;; ----------------------------------------------------------------------------
;; Z80 CPU + State transfer area

;; Z80 registers (32 byte)
;; The index of the register area (length: 0x1c)
(global $REG_AREA_INDEX i32 (i32.const 0x0120_0E00))

;; Z80 8-bit register index conversion table (8 bytes)
(global $REG8_TAB_OFFS i32 (i32.const 0x0120_0E20))

;; Z80 16-bit register index conversion table (4 bytes)
(global $REG16_TAB_OFFS i32 (i32.const 0x0120_0E30))

;; State transfer buffer between WA and JS (0x672 bytes)
(global $STATE_TRANSFER_BUFF i32 (i32.const 0x0120_0E60))

;; ----------------------------------------------------------------------------
;; Engine infrastructure

;; Breakpoints map (0x2000 bytes)
(global $BREAKPOINT_MAP i32 (i32.const 0x0120_2000))

;; Breakpoint pages map (0x01_0000 bytes)
(global $BREAKPOINT_PAGES_MAP i32 (i32.const 0x0120_4000))

;; Memory write map (0x2000 bytes)
(global $MEMWRITE_MAP i32 (i32.const 0x0121_4000))

;; Code read map (0x2000 bytes)
(global $CODE_READ_MAP i32 (i32.const 0x0121_6000))

;; Memory read map (0x2000 bytes)
(global $MEMREAD_MAP i32 (i32.const 0x0121_8000))

;; Step-out stack (1024 bytes)
(global $STEP_OUT_STACK i32 (i32.const 0x0121_A000))

;; Machine-specific memory: 0x0122_0000

;; ==========================================================================
;; Z80 test machine buffers

;; Test I/O input buffer (256 bytes)
(global $TEST_INPUT_OFFS i32 (i32.const 0x0122_0000))

;; Test memory access log (0x400 bytes)
(global $TEST_MEM_LOG_OFFS i32 (i32.const 0x0122_0100))

;; Test I/O access log (0x400 bytes)
(global $TEST_IO_LOG_OFFS i32 (i32.const 0x0122_0500))

;; Test TbBlue access log (0x400 bytes)
(global $TEST_TBBLUE_LOG_OFFS i32 (i32.const 0x0122_0900))

;; ==========================================================================
;; ZX Spectrum specific contents

;; ----------------------------------------------------------------------------
;; RAM banks

;; 128K RAM. These are the RAM banks of ZS Spectrum 128/+3
;; Also, the first 3 banks are used as the RAM of ZX Spectrum 48K
(global $BANK_0_OFFS i32 (i32.const 0x00_0000))
(global $BANK_1_OFFS i32 (i32.const 0x00_4000))
(global $BANK_2_OFFS i32 (i32.const 0x00_8000))
(global $BANK_3_OFFS i32 (i32.const 0x00_C000))
(global $BANK_4_OFFS i32 (i32.const 0x01_0000))
(global $BANK_5_OFFS i32 (i32.const 0x01_4000))
(global $BANK_6_OFFS i32 (i32.const 0x01_8000))
(global $BANK_7_OFFS i32 (i32.const 0x01_C000))

;; ----------------------------------------------------------------------------
;; ROM pages

;; ZX Spectrum 48K ROM (0x4000 bytes)
(global $ROM_48_OFFS i32 (i32.const 0x02_0000))

;; ZX Spectrum 128 ROM 0 (0x4000 bytes)
(global $ROM_128_0_OFFS i32 (i32.const 0x02_4000))

;; ZX Spectrum 128 ROM 1 (0x4000 bytes)
(global $ROM_128_1_OFFS i32 (i32.const 0x02_8000))

;; ZX Spectrum +3 ROM 0 (0x4000 bytes)
(global $ROM_P3_0_OFFS i32 (i32.const 0x02_C000))

;; ZX Spectrum +3 ROM 1 (0x4000 bytes)
(global $ROM_P3_1_OFFS i32 (i32.const 0x03_0000))

;; ZX Spectrum +3 ROM 2 (0x4000 bytes)
(global $ROM_P3_2_OFFS i32 (i32.const 0x03_4000))

;; ZX Spectrum +3 ROM 3 (0x4000 bytes)
(global $ROM_P3_3_OFFS i32 (i32.const 0x03_8000))

;; ----------------------------------------------------------------------------
;; ZX Spectrum buffers

;; ZX Spectrum execution cyle options (256 bytes)
(global $EXEC_OPTIONS_BUFF i32 (i32.const 0x0122_0000))

;; Keyboard line status (128 bytes)
(global $KEYBOARD_LINES i32 (i32.const 0x0122_0100))

;; Page index table for addressing memory (24 bytes)
(global $PAGE_INDEX_16 i32 (i32.const 0x0122_0180))

;; Rendering tact table (0x6_0000 bytes)
;; Each table entry has 5 bytes:
;; Byte 0: 
;;   Bit 4..0: Rendering phase
;;     0x00: None. The ULA does not do any rendering.
;;     0x04: Border. The ULA sets the border color to display the current pixel.
;;     0x05: BorderFetchPixel. The ULA sets the border color to display the
;;           current pixel. It prepares to display the fist pixel in the row
;;           with pre-fetching the corresponding byte from the display memory.
;;     0x06: BorderFetchAttr. The ULA sets the border color to display the
;;           current pixel. It has already fetched the 8 pixel bits to display.
;;           It carries on preparing to display the fist pixel in the row with
;;           pre-fetching the corresponding attribute byte from the display memory.
;;     0x08: DisplayB1. The ULA displays the next two pixels of Byte1 sequentially
;;           during a single Z80 clock cycle.
;;     0x09: DisplayB1FetchB2. The ULA displays the next two pixels of Byte1
;;           sequentially during a single Z80 clock cycle. It prepares to display
;;           the pixels of the next byte in the row with pre-fetching the
;;           corresponding byte from the display memory.
;;     0x0a: DisplayB1FetchA2. The ULA displays the next two pixels of Byte1
;;           sequentially during a single Z80 clock cycle. It prepares to display
;;           the pixels of the next byte in the row with pre-fetching the
;;           corresponding attribute from the display memory.
;;     0x10: DisplayB2. The ULA displays the next two pixels of Byte2 sequentially
;;           during a single Z80 clock cycle.
;;     0x11: DisplayB2FetchB1. The ULA displays the next two pixels of Byte2
;;           sequentially during a single Z80 clock cycle. It prepares to display
;;           the pixels of the next byte in the row with pre-fetching the
;;           corresponding byte from the display memory.
;;     0x12: DisplayB2FetchA1. The ULA displays the next two pixels of Byte2
;;           sequentially during a single Z80 clock cycle. It prepares to display
;;           the pixels of the next byte in the row with pre-fetching the
;;           corresponding attribute from the display memory.
;;   Bit 7..5: Tact contention value
;; Byte 1..2: Pixel address
;; Byte 3..4: Attribute address
(global $RENDERING_TACT_TABLE i32 (i32.const 0x0122_0200))

;; Contention value table (0x1_4000 bytes)
(global $CONTENTION_TABLE i32 (i32.const 0x0128_0200))

;; Paper color bytes, flash off (256 bytes)
(global $PAPER_COLORS_OFF_TABLE i32 (i32.const 0x0129_4200))

;; Ink color bytes, flash off (256 bytes)
(global $INK_COLORS_OFF_TABLE i32 (i32.const 0x0129_4300))

;; Paper color bytes, flash on (256 bytes)
(global $PAPER_COLORS_ON_TABLE i32 (i32.const 0x0129_4400))

;; Ink color bytes, flash on (256 bytes)
(global $INK_COLORS_ON_TABLE i32 (i32.const 0x0129_4500))

;; ZX Spectrum 48 palette (256 byte)
(global $SPECTRUM_PALETTE i32 (i32.const 0x0129_4600))

;; Pixel rendering buffer (0x2_8000 bytes)
(global $PIXEL_RENDERING_BUFFER i32 (i32.const 0x0129_4700))

;; Buffer for pixel colorization (0xA_0000 bytes)
(global $COLORIZATION_BUFFER i32 (i32.const 0x012B_C700))

;; Beeper sample rendering buffer (0x2000 bytes)
(global $BEEPER_SAMPLE_BUFFER i32 (i32.const 0x0135_C700))

;; Sound sample rendering buffer (0x2000 bytes)
(global $PSG_SAMPLE_BUFFER i32 (i32.const 0x0135_E700))

;; Tape block buffer (0xA_0000 bytes)
(global $TAPE_DATA_BUFFER i32 (i32.const 0x0136_0700))

;; Tape save buffer (0x1_0000 bytes)
(global $TAPE_SAVE_BUFFER i32 (i32.const 0x0140_0700))

;; ----------------------------------------------------------------------------
;; ZX Spectrun debug support maps

;; ----------------------------------------------------------------------------
;; Sound generation

;; PSG Register area: 0x23_2F00 (256 bytes)
(global $PSG_REGS i32 (i32.const 0x0141_4B00))

;; Envelop tables for PSG sound generation (0x800 bytes)
(global $PSG_ENVELOP_TABLE i32 (i32.const 0x0141_4C00))

;; PSG volumes (16 words)
(global $PSG_VOLUME_TABLE i32 (i32.const 0x0141_5300))

;; ==========================================================================
;; Cambridge Z88 specific contents

;; Memory extension registers area, SR0-SR3 (4 bytes)
(global $Z88_SR i32 (i32.const 0x0122_0000))

;; Chip size masks describing the chip size (5 bytes)
;; 0: Internal ROM size
;; 1: Internal RAM size
;; 2: Card Slot 1 size
;; 3: Card Slot 2 size
;; 4: Card Slot 3 size
;; 5: Is Card Slot 3 ROM?
(global $Z88_CHIP_MASKS i32 (i32.const 0x0122_0010))

;; Pointers for the address slots (40 byte)
(global $Z88_PAGE_PTRS i32 (i32.const 0x0122_0020))

;; Pointers for the address slots (256 byte)
(global $Z88_ROM_INFO i32 (i32.const 0x0122_0100))

;; Z88 Memory (4 MBytes)
(global $Z88_MEM_AREA i32 (i32.const 0x0000_0000))
