#Generates input for turning machine from decimal
def gen_input decimal1, decimal2
	output = ""
	10.times do
		output = output << "0"
	end
	decimal1.times do
		output = output << "1"
	end
	output = output << "0"
	decimal2.times do
		output = output << "1"
	end
	10.times do 
		output = output << "0"
	end
	output
end