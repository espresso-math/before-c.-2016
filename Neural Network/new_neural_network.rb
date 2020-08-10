module OddEnd
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

	def play(inputs, layer)
		output_calc( rand_weights(layer) )
	end
end



