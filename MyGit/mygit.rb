require_relative 'db'

class GitBox
  attr_accessor :user, :email
	def initialize( user, email )
    #check database for username and email
    data = Database.new("Justchecking!!")
		#read details and store it in memory
    @user = user
    @email = email
	end
end

