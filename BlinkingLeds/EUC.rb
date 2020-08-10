require_relative 'math_ex'
require_relative 'iterate'
require_relative 'charlieplexer_controller_lib'

#Binary to machine code
decimal1 = 34
decimal2 = 14

#Turing Machine code
class TuringMachine
	def initialize
		@state = "000000"
		#instruction for the turing machine
		#left side: input 1 bit, state 6 bit
		#right side: input 1 bit, left or right 1 bit, state 6 bit
		@instruction = {
			"0000000" => "0R000000",
			"1000000" => "1L000001",
			"0000001" => "1R000010",
			"1000001" => "1L000001",
			"0000010" => "0R001010",
			"1000010" => "0R000011",
			"0000011" => "0R000100",
			"1000011" => "1R000011",
			"0000100" => "0R000100",
			"1000100" => "0R000101",
			"0000101" => "0L000111",
			"1000101" => "1L000110",
			"0000110" => "0L000110",
			"1000110" => "1L000001",
			"0000111" => "0L000111",
			"1000111" => "1L001000",
			"0001000" => "0L001001",
			"1001000" => "1L001000",
			"0001001" => "0R000010",
			"1001001" => "1L000001",
			"0001010" => "0H000000",
			"1001010" => "1R001010"
		}
		@stop = "0"
		@input = "0"
	end
	def run
		i = 0
		while @stop != "H"
			past = @input[i] << @state
			future = @instruction[past]
			@state = future[2..7]
			@input[i] = future[0]
			if future[1] == "R"
				i += 1
			elsif future[1] == "L"
				i -= 1
			else
				#Use anything instead of H here
				@stop = "H"
			end
		end
		@input
	end
	def get_numbers decimal1, decimal2
		@input = gen_input decimal1, decimal2
	end
	def to_binary	
		flag = 0
		@input.each_char do |letter|
			if letter == "1"
				flag += 1
			else
				flag += 0
			end
		end
		bin_ary = dec2bin(flag).to_s
	end
end

tome = TuringMachine.new
tome.get_numbers 25, 50
tome.run
real_output = padding(tome.to_binary)
p real_output

#initialize board
board = Dino::Board.new(Dino::TxRx::Serial.new)
pin_13 = Dino::Components::Led.new(pin: 13, board: board)
pin_12 = Dino::Components::Led.new(pin: 12, board: board)
pin_11 = Dino::Components::Led.new(pin: 11, board: board)
pin_10 = Dino::Components::Led.new(pin: 10, board: board)
pin_9 = Dino::Components::Led.new(pin: 9, board: board)
pin_8 = Dino::Components::Led.new(pin: 8, board: board)
pin_7 = Dino::Components::Led.new(pin: 7, board: board)

trom = PinCushion.new pin_13, pin_12, pin_11, pin_10, pin_9, pin_8, pin_7
5.times do
	trom.led_array_scanner "101010101010"
end
sleep 2