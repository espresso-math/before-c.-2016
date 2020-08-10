l = gets.chomp.to_i
m = []
while l % 2 == 0
	m << l/2
	l = l / 2
end
puts m	

