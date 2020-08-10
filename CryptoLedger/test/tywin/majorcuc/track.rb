#track.rb
require_relative 'ledger'

class Track
	def initialize
		#tracker list
		@list = []
	end
	#public functions
 public
 	def recursive_search folder
 		if Dir.exists? folder
 			Dir.foreach folder do |fdir|
 				@list << folder
 				puts fdir
 				if Dir.exists? fdir
 					recursive_search fdir
 				end
 			end
 		end
 	end
end

tango = Track.new
tango.recursive_search 'test'
