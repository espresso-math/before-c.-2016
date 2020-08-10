#
# This is a simple example to blink an led
# every half a second
#
require 'bundler/setup'
require 'dino'

board = Dino::Board.new(Dino::TxRx::Serial.new)
pin11 = Dino::Components::Led.new(pin: 11, board: board)
pin9 = Dino::Components::Led.new(pin: 9, board: board)

pin11.send(:off)
pin9.send(:on)

sleep 5