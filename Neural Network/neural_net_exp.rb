#Neural network implementation. All neurons are methods
#to find sum

class NeuralNetwork

	public

	def neural_net_map( input1, input2 )
		#layer 1
		o1 = play_neuron(rand_weights(1), input1)
		o2 = play_neuron(rand_weights(1), input2)
		in3 = [o1, o2]
		#layer 2
		weights = rand_weights 2
		o3 = play_neuron(weights, in3)

		unless o3 == 3

	end

	def calculate_error( input, weight, expected_output )

	end

	def play_neuron( weight, input )
		output_calc( weight, input )
	end

	def activation( weight, input )
		#The activation is defined as the result of sigma x(i)*w(ij)
		activate = 0
		weight.length.times do |index|
			activate += weight[ index ] * input[ index ]
		end
		return activate
	end

	def output_calc( weight, input )
		output = 1/(1+2.71828182846**activation( weight, input ))
	end

	def rand_weights( req )
		output = []
		req.times { output << 99343 + Random.rand( 456000 ) }
		return output 
	end

end

nurn = NeuralNetwork.new 
puts nurn.neural_net_map 45, 67

