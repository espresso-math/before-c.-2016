require 'chunky_png'

# Creating an image from scratch, save as an interlaced PNG
png = ChunkyPNG::Image.new(100, 100, ChunkyPNG::Color::TRANSPARENT)
100.times do |i|
	100.times do |j|
		png[i,j] = ChunkyPNG::Color.rgb(10, 20, 30)
	end
end
png.save('map.png', :interlace => true)