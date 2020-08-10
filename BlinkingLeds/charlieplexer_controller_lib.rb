require 'bundler/setup'
require 'dino'


class PinCushion
	def initialize pin_13, pin_12, pin_11, pin_10, pin_9, pin_8, pin_7
		@pin_13 = pin_13
		@pin_12 = pin_12
		@pin_11 = pin_11
		@pin_10 = pin_10
		@pin_9 = pin_9
		@pin_8 = pin_8
		@pin_7 = pin_7
	end
	def led_1
		@pin_13.send(:on)
		@pin_12.send(:off)
	end

	def led_2
		@pin_13.send(:off)
		@pin_12.send(:on)
		@pin_11.send(:on)
		@pin_10.send(:on)
		@pin_9.send(:on)
		@pin_8.send(:on)
		@pin_7.send(:on)
	end

	def led_3
		@pin_13.send(:on)
		@pin_12.send(:on)
		@pin_11.send(:off)
		@pin_10.send(:off)
		@pin_9.send(:off)
		@pin_8.send(:off)
		@pin_7.send(:off)
	end

	def led_4
		@pin_13.send(:off)
		@pin_12.send(:off)
		@pin_11.send(:on)
		@pin_10.send(:on)
		@pin_9.send(:on)
		@pin_8.send(:on)
		@pin_7.send(:on)
	end

	def led_5
		@pin_13.send(:on)
		@pin_12.send(:on)
		@pin_11.send(:on)
		@pin_10.send(:off)
		@pin_9.send(:off)
		@pin_8.send(:off)
		@pin_7.send(:off)
	end

	def led_6
		@pin_13.send(:off)
		@pin_12.send(:off)
		@pin_11.send(:off)
		@pin_10.send(:on)
		@pin_9.send(:on)
		@pin_8.send(:on)
		@pin_7.send(:on)
	end

	def led_7
		@pin_13.send(:on)
		@pin_12.send(:on)
		@pin_11.send(:on)
		@pin_10.send(:on)
		@pin_9.send(:off)
		@pin_8.send(:off)
		@pin_7.send(:off)
	end

	def led_8
		@pin_13.send(:off)
		@pin_12.send(:off)
		@pin_11.send(:off)
		@pin_10.send(:off)
		@pin_9.send(:on)
		@pin_8.send(:on)
		@pin_7.send(:on)
	end

	def led_9
		@pin_13.send(:on)
		@pin_12.send(:on)
		@pin_11.send(:on)
		@pin_10.send(:on)
		@pin_9.send(:on)
		@pin_8.send(:off)
		@pin_7.send(:off)
	end

	def led_10
		@pin_13.send(:off)
		@pin_12.send(:off)
		@pin_11.send(:off)
		@pin_10.send(:off)
		@pin_9.send(:off)
		@pin_8.send(:on)
		@pin_7.send(:on)
	end

	def led_11
		@pin_13.send(:on)
		@pin_12.send(:on)
		@pin_11.send(:on)
		@pin_10.send(:on)
		@pin_9.send(:on)
		@pin_8.send(:on)
		@pin_7.send(:off)
	end

	def led_12
		@pin_13.send(:off)
		@pin_12.send(:off)
		@pin_11.send(:off)
		@pin_10.send(:off)
		@pin_9.send(:off)
		@pin_8.send(:off)
		@pin_7.send(:on)
	end

	def led_fireblank
		@pin_13.send(:off)
		@pin_12.send(:off)
		@pin_11.send(:off)
		@pin_10.send(:off)
		@pin_9.send(:off)
		@pin_8.send(:off)
		@pin_7.send(:off)
	end
	def led_array_scanner led_array
		sim_array = ['led_1', 'led_2', 'led_3', 'led_4', 'led_5', 'led_6', 'led_7', 'led_8', 'led_9', 'led_10', 'led_11', 'led_12']
		i = 0
		while i < 12
			if led_array[i] == "1"
				case sim_array[i]
				when 'led_1'
					self.led_1
				when 'led_2'
					self.led_3
				when 'led_3'
					self.led_5
				when 'led_4'
					self.led_7
				when 'led_5'
					self.led_9
				when 'led_6'
					self.led_11
				when 'led_7'
					self.led_2
				when 'led_8'
					self.led_4
				when 'led_9'
					self.led_6
				when 'led_10'
					self.led_8
				when 'led_11'
					self.led_10
				when 'led_12'
					self.led_12
				end
				sleep 1
				self.led_fireblank
				sleep 1
			else 
				self.led_fireblank
			end
			
			i += 1
		end
	end
end


