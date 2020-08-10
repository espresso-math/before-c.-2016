#instruction for the turing machine
#left side: input 1 bit, state 6 bit
#right side: input 1 bit, left or right 1 bit, state 6 bit
instruction = {
	"0000000" => "0R000000",
	"1000000" => "1L000001",
	"0000001" => "1R000010",
	"1000001" => "1L000001",
	"0000010" => "0R001010",
	"1000010" => "0R000011",
	"0000011" => "0R000100",
	"1000011" => "1R000011",
	"0000100" => "0R000100",
	"1000100" => "0R000101",
	"0000101" => "0L000111",
	"1000101" => "1L000110",
	"0000110" => "0L000110",
	"1000110" => "1L000001",
	"0000111" => "0L000111",
	"1000111" => "1L001000",
	"0001000" => "0L001001",
	"1001000" => "1L001000",
	"0001001" => "0R000010",
	"1001001" => "1L000001",
	"0001010" => "0H000000",
	"1001010" => "1R001010"
}