require_relative 'new_neural_network'

=begin
  A neural network looks something like this
          ->(o)\__>(O)->
          ->(o)/
To create a neural network first there must be the activation and output calculators.
Each layer is inside a loop.
=end

class Network

  include OddEnd
  attr_reader :output

  def initalize
    @output = []
  end

  def map_neuron(*inputs)
    #each layer a loop
    @output = inputs
    2.times do |layer|
      @output = play(inputs, (3-layer))
    end
  end

end

t = Network.new
Network.map_neuron(456, 234)
puts Network.output
