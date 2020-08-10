# ledger.rb
require 'openssl'
require 'fileutils'

#defines the main class
class Ledger
	def initialize
		@microledger = '.cryptoledger/.microledger'
		@cryptoledger = '.cryptoledger'
		unless Dir.exist? '.cryptoledger'
			FileUtils.mkdir( '.cryptoledger' )
		end
	end
 public
	#this function here adds another block to the blockchain
	def update input
		if File.exists? @microledger
			open( @microledger, 'a' ) do |file|
				sha256 = OpenSSL::Digest::SHA256.new
				id = self.bin_to_hex( sha256.digest rand( 344444 ).to_s ).slice( 0..7 )
				hashsum = self.newblock input, id
				file.puts( "#{id} #=> #{hashsum}" )
			end
			sha256 = OpenSSL::Digest::SHA256.new
			key = OpenSSL::PKey::RSA.new File.read 'key.pem'
			if key.private?
				signature = key.sign( sha256, File.read( @microledger ) )
				open( @microledger, 'a' ) do |file|
					file.puts "Signature #=> #{ bin_to_hex signature }"
				end
			end
		else
			FileUtils.touch( @microledger )
			self.update input
		end	
	end
 	#this function creates a new block
 	def newblock input, id
 		block = "#{id}\n#{input}"
 		if Dir.exists? '.cryptoledger/blocks'
 				FileUtils.touch( ".cryptoledger/blocks/#{id}" )
 				open( ".cryptoledger/blocks/#{id}", 'w' ) do |file|
 					file.write block
 				end
 				sha256 = OpenSSL::Digest::SHA256.new
 				return self.bin_to_hex( sha256.digest block )
 		else
 			FileUtils.mkdir( '.cryptoledger/blocks' )
 			return self.newblock input, id
 		end
 	end
 	#some helper functions
 	def bin_to_hex(s)
  	s.unpack('H*').first
	end
	def hex_to_bin(s)
	  s.scan(/../).map { |x| x.hex }.pack('c*')
	end
end