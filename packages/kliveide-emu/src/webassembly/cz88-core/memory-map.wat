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

;; Keyboard line status (128 bytes)
(global $KEYBOARD_LINES i32 (i32.const 0x0122_0200))

;; Z88 Memory (4 MBytes)
(global $Z88_MEM_AREA i32 (i32.const 0x0000_0000))
