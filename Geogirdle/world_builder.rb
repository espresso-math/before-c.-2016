#require_relative 'std_lib.rb'
require 'chunky_png'

class WorldBuilder
	 def initialize row, col
		@row = row #rows
		@col = col #cols
		@world = Array.new( @row ) { Array.new( @col, "*" ) } # the world array
		@map_legend = {
			"g" => [250, 250, 250], # white for glaciers
			"l"	=> [150, 75, 0],	# brown for landmass
			"o"	=> [0, 0, 250]      # blue for the oceans
		}
	end
	def generate
		@world.each do |i|
			i.each do |j|
				print j
			end
			print "\n"
		end
	end
	def draw #seed, depth

		png = ChunkyPNG::Image.new(700, 400, ChunkyPNG::Color::TRANSPARENT)
		700.times do |i|
			400.times do |j|
				png[i,j] = ChunkyPNG::Color.rgb(rand(255), rand(255), rand(255))
			end
		end
		png.save('map.png', :interlace => true)

	end
end