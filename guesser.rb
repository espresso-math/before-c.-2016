input = gets.chomp
al = "abcdefghijklmnopqrstuvwxyz"
output = ""
counter = 0
26.times do |i|
	26.times do |j|
		26.times do |k|
			26.times do |l|
				output = al[i] + al [j] + al[k] + al[l]
				counter += 1
				puts output if input == output
				puts counter if input == output
			end
		end
	end
end
