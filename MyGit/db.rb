=begin
#use this first
File::open( "ids.txt" ,"w") do |f|
  f << "10000"
end
=end
class Database
	attr_reader :id, :db, :database
	#Needs to keep a list of data base
	@@database = {}
	def initialize( database_name )
    #generates a new unique id
		@id = id_gen
		@database_name = database_name
		@@database[@id] = database_name
    #The database is stored here before being written to a file
    @db = {}
	end
  private
  	def id_gen
  		new_id = ""
  		File::readlines( "ids.txt" ).each do |line|
  			new_id = line.to_i( base = 10 ) + 1 if !line.include? "\n"
  		end
  		File.open( "ids.txt", "a" ) do |wu|
  			wu << "\n#{new_id.to_s}"
  		end
  		return new_id
  	end
    #puts hash into a text file
  	def write!
      filename = "db_#{@id}_#{@@database[ @id ]}.txt"
      prep_text = ""
      @db.each do |primary_key, entries|
        prep_text = "#{primary_key}"
        entries.each do |entry|
          prep_text += "<|=|>#{entry}"
        end
      end
      prep_text += "\n"
      File::open( filename, "a" ) do |file|
        file << prep_text
      end
      true
  	end
  public
    #retrieve database from disk
    def read( id, database_name )
      gt_text = []
      @db = {}
      File::readlines( "db_#{id}_#{database_name}.txt" ).each do |line|
        gt_text << line.chomp.split("<|=|>")
      end
      gt_text.each do |row|
        @db[ row[0].to_i ] = row[1..(row.length-1)]
      end
    end

  	#CRUD
  	def create( primary_key, *entries)
  		unless @db[ primary_key ] != nil
  			@db[ primary_key ] = entries
        write!
  			true
  		else
  			false
  		end
  	end
    #Display
    def display( primary_key )
      each_row = [ ]
      unless @db[ primary_key ] == nil
        each_row << primary_key
        each_row << @db[ primary_key ]
      else
        false
      end
    end
    #Update
    def update( primary_key, *new_entries )
      unless @db[ primary_key ] == nil
        @db[ primary_key ] = new_entries
        write!
        true
      else
        false
      end
    end
end
