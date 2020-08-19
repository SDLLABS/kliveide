;; ==========================================================================
;; Helper functions to manage a ZX Spectrum machine

;; Sets up the ZX Spectrum machine
(func $setupMachine 
  ;; Let's use ULA issue 3 by default
  i32.const 3 set_global $ulaIssue

  call $resetMachine

  ;; Invoke machine type specific setup
  (i32.add
    (i32.mul (get_global $MACHINE_TYPE) (get_global $MACHINE_FUNC_COUNT))
    (i32.const 7)
  )
  call_indirect (type $ActionFunc)
)

;; Gets the ZX Spectrum 48 machine state
(func $getCommonSpectrumMachineState
  ;; CPU configuration
  (i32.store offset=48 (get_global $STATE_TRANSFER_BUFF) (get_global $baseClockFrequency))      
  (i32.store8 offset=52 (get_global $STATE_TRANSFER_BUFF) (get_global $clockMultiplier))      
  (i32.store8 offset=53 (get_global $STATE_TRANSFER_BUFF) (get_global $supportsNextOperation))      

  ;; Memory configuration
  (i32.store8 offset=54 (get_global $STATE_TRANSFER_BUFF) (get_global $numberOfRoms))      
  (i32.store offset=55 (get_global $STATE_TRANSFER_BUFF) (get_global $romContentsAddress))      
  (i32.store8 offset=59 (get_global $STATE_TRANSFER_BUFF) (get_global $spectrum48RomIndex))      
  (i32.store8 offset=60 (get_global $STATE_TRANSFER_BUFF) (get_global $contentionType))      
  (i32.store8 offset=61 (get_global $STATE_TRANSFER_BUFF) (get_global $ramBanks))      
  (i32.store8 offset=62 (get_global $STATE_TRANSFER_BUFF) (get_global $nextMemorySize))

  ;; Screen frame configuration
  (i32.store16 offset=63 (get_global $STATE_TRANSFER_BUFF) (get_global $interruptTact))      
  (i32.store16 offset=65 (get_global $STATE_TRANSFER_BUFF) (get_global $verticalSyncLines))      
  (i32.store16 offset=67 (get_global $STATE_TRANSFER_BUFF) (get_global $nonVisibleBorderTopLines))      
  (i32.store16 offset=69 (get_global $STATE_TRANSFER_BUFF) (get_global $borderTopLines))      
  (i32.store16 offset=71 (get_global $STATE_TRANSFER_BUFF) (get_global $displayLines))      
  (i32.store16 offset=73 (get_global $STATE_TRANSFER_BUFF) (get_global $borderBottomLines))      
  (i32.store16 offset=75 (get_global $STATE_TRANSFER_BUFF) (get_global $nonVisibleBorderBottomLines))      
  (i32.store16 offset=77 (get_global $STATE_TRANSFER_BUFF) (get_global $horizontalBlankingTime))      
  (i32.store16 offset=79 (get_global $STATE_TRANSFER_BUFF) (get_global $borderLeftTime))      
  (i32.store16 offset=81 (get_global $STATE_TRANSFER_BUFF) (get_global $displayLineTime))      
  (i32.store16 offset=83 (get_global $STATE_TRANSFER_BUFF) (get_global $borderRightTime))      
  (i32.store16 offset=85 (get_global $STATE_TRANSFER_BUFF) (get_global $nonVisibleBorderRightTime))      
  (i32.store16 offset=87 (get_global $STATE_TRANSFER_BUFF) (get_global $pixelDataPrefetchTime))      
  (i32.store16 offset=89 (get_global $STATE_TRANSFER_BUFF) (get_global $attributeDataPrefetchTime))      

  ;; Calculated screen attributes
  (i32.store offset=91 (get_global $STATE_TRANSFER_BUFF) (get_global $screenLines))      
  (i32.store offset=95 (get_global $STATE_TRANSFER_BUFF) (get_global $firstDisplayLine))
  (i32.store offset=99 (get_global $STATE_TRANSFER_BUFF) (get_global $lastDisplayLine))
  (i32.store offset=103 (get_global $STATE_TRANSFER_BUFF) (get_global $borderLeftPixels))      
  (i32.store offset=107 (get_global $STATE_TRANSFER_BUFF) (get_global $borderRightPixels))      
  (i32.store offset=111 (get_global $STATE_TRANSFER_BUFF) (get_global $displayWidth))      
  (i32.store offset=115 (get_global $STATE_TRANSFER_BUFF) (get_global $screenWidth))      
  (i32.store offset=119 (get_global $STATE_TRANSFER_BUFF) (get_global $screenLineTime))      
  (i32.store offset=123 (get_global $STATE_TRANSFER_BUFF) (get_global $rasterLines))      
  (i32.store offset=127 (get_global $STATE_TRANSFER_BUFF) (get_global $firstDisplayPixelTact))      
  (i32.store offset=131 (get_global $STATE_TRANSFER_BUFF) (get_global $firstScreenPixelTact))

  ;; ZX Spectrum engine state
  (i32.store8 offset=135 (get_global $STATE_TRANSFER_BUFF) (get_global $ulaIssue))
  (i32.store offset=136 (get_global $STATE_TRANSFER_BUFF) (get_global $lastRenderedUlaTact))
  (i32.store offset=140 (get_global $STATE_TRANSFER_BUFF) (get_global $frameCount))
  (i32.store8 offset=144 (get_global $STATE_TRANSFER_BUFF) (get_global $frameCompleted))
  (i32.store offset=145 (get_global $STATE_TRANSFER_BUFF) (get_global $contentionAccummulated))
  (i32.store offset=149 (get_global $STATE_TRANSFER_BUFF) (get_global $lastExecutionContentionValue))
  (i32.store8 offset=153 (get_global $STATE_TRANSFER_BUFF) (get_global $emulationMode))
  (i32.store8 offset=154 (get_global $STATE_TRANSFER_BUFF) (get_global $debugStepMode))
  (i32.store8 offset=155 (get_global $STATE_TRANSFER_BUFF) (get_global $fastTapeMode))
  (i32.store8 offset=156 (get_global $STATE_TRANSFER_BUFF) (get_global $terminationRom))
  (i32.store16 offset=157 (get_global $STATE_TRANSFER_BUFF) (get_global $terminationPoint))
  (i32.store8 offset=159 (get_global $STATE_TRANSFER_BUFF) (get_global $fastVmMode))
  (i32.store8 offset=160 (get_global $STATE_TRANSFER_BUFF) (get_global $disableScreenRendering))
  (i32.store8 offset=161 (get_global $STATE_TRANSFER_BUFF) (get_global $executionCompletionReason))

  ;; Keyboard lines
  (i32.store offset=162 (get_global $STATE_TRANSFER_BUFF) (i32.load offset=0 (get_global $KEYBOARD_LINES)))
  (i32.store offset=166 (get_global $STATE_TRANSFER_BUFF) (i32.load offset=4 (get_global $KEYBOARD_LINES)))

  ;; Port state
  (i32.store8 offset=170 (get_global $STATE_TRANSFER_BUFF) (get_global $portBit3LastValue))
  (i32.store8 offset=171 (get_global $STATE_TRANSFER_BUFF) (get_global $portBit4LastValue))
  (i32.store offset=172 (get_global $STATE_TRANSFER_BUFF) (get_global $portBit4ChangedFrom0Tacts))
  (i32.store offset=176 (get_global $STATE_TRANSFER_BUFF) (get_global $portBit4ChangedFrom1Tacts))

  ;; Interrupt state
  (i32.store8 offset=180 (get_global $STATE_TRANSFER_BUFF) (get_global $interruptRaised))
  (i32.store8 offset=181 (get_global $STATE_TRANSFER_BUFF) (get_global $interruptRevoked))

  ;; Screen state
  (i32.store8 offset=182 (get_global $STATE_TRANSFER_BUFF) (get_global $borderColor))
  (i32.store8 offset=183 (get_global $STATE_TRANSFER_BUFF) (get_global $flashPhase))
  (i32.store8 offset=184 (get_global $STATE_TRANSFER_BUFF) (get_global $pixelByte1))
  (i32.store8 offset=185 (get_global $STATE_TRANSFER_BUFF) (get_global $pixelByte2))
  (i32.store8 offset=186 (get_global $STATE_TRANSFER_BUFF) (get_global $attrByte1))
  (i32.store8 offset=187 (get_global $STATE_TRANSFER_BUFF) (get_global $attrByte2))
  (i32.store8 offset=188 (get_global $STATE_TRANSFER_BUFF) (get_global $flashFrames))
  (i32.store offset=189 (get_global $STATE_TRANSFER_BUFF) (get_global $renderingTablePtr))
  (i32.store offset=193 (get_global $STATE_TRANSFER_BUFF) (get_global $pixelBufferPtr))

  ;; Beeper state
  (i32.store offset=197 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperSampleRate))
  (i32.store offset=201 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperSampleLength))
  (i32.store offset=205 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperLowerGate))
  (i32.store offset=209 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperUpperGate))
  (i32.store offset=213 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperGateValue))
  (i32.store offset=217 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperNextSampleTact))
  (i32.store8 offset=221 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperLastEarBit))
  (i32.store offset=222 (get_global $STATE_TRANSFER_BUFF) (get_global $beeperSampleCount))

  ;; Tape device state
  (i32.store8 offset=226 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeMode))
  (i32.store16 offset=227 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeLoadBytesRoutine))
  (i32.store16 offset=229 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeLoadBytesResume))
  (i32.store16 offset=231 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeLoadBytesInvalidHeader))
  (i32.store16 offset=233 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeSaveBytesRoutine))
  (i32.store8 offset=235 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeBlocksToPlay))
  (i32.store8 offset=236 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeEof))
  (i32.store offset=237 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeBufferPtr))
  (i32.store offset=241 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeNextBlockPtr))
  (i32.store8 offset=245 (get_global $STATE_TRANSFER_BUFF) (get_global $tapePlayPhase))
  (i64.store offset=246 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeStartTact))
  (i32.store8 offset=254 (get_global $STATE_TRANSFER_BUFF) (get_global $tapeBitMask))
)

;; Copies a segment of memory
;; $from: Source address
;; $to: Destination address
;; $count #of bytes to copy
(func $copyMemory (param $from i32) (param $to i32) (param $count i32)
  loop $copy
    (i32.gt_u (get_local $count) (i32.const 0))
    if
      ;; Copy a single byte
      get_local $to
      get_local $from
      i32.load8_u
      i32.store8

      ;; Increment indexes
      (i32.add (get_local $from) (i32.const 1))
      set_local $from
      (i32.add (get_local $to) (i32.const 1))
      set_local $to

      ;; Decrement counter
      (i32.sub (get_local $count) (i32.const 1))
      set_local $count
      
      ;; continue
      br $copy
    end
  end
)

;; Starts a new frame
(func $startNewFrame
    ;; TODO: Init a new frame
    ;; Invoke machine type specific "New frame" function
    (i32.add
    (i32.mul (get_global $MACHINE_TYPE) (get_global $MACHINE_FUNC_COUNT))
    (i32.const 9)
  )
  call_indirect (type $ActionFunc)
)

;; Executes the actions to respond a screen rendering frame completion
(func $completeFrame
    ;; TODO: Complete
    ;; Invoke machine type specific "Frame completed" function
    (i32.add
    (i32.mul (get_global $MACHINE_TYPE) (get_global $MACHINE_FUNC_COUNT))
    (i32.const 10)
  )
  call_indirect (type $ActionFunc)
)

;; Colorizes the data in pixel buffer
(func $colorize
  (i32.add
    (i32.mul (get_global $MACHINE_TYPE) (get_global $MACHINE_FUNC_COUNT))
    (i32.const 11)
  )
  call_indirect (type $ActionFunc)
)

;; Gets the current cursor mode
(func $getCursorMode (result i32)
  ;; Get the value of the MODE ZX Spectrum system variable
  (i32.add (get_global $BANK_0_OFFS) (i32.const 0x5c41))
  i32.load8_u
)