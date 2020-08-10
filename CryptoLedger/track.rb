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
 		@list << folder
 		if Dir.exists? folder
 			Dir.foreach  do |fdir|
 				@list << fdir
 				puts fdir
 				Dir.chdir folder
 				if Dir.exists? fdir
 					recursive_search fdir
 				end
 				Dir.chdir '../'
 			end
 		end
 	end
end

tango = Track.new
tango.recursive_search 'test'
