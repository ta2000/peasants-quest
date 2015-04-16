var missions = [
	["My cat is stuck in a tree. Can you help me?",													 	"l",	"tree_cat"],
	["My dog is stuck in a tree. Can you help me?",													 	"l",	"tree_dog"],
	["My house is on fire! Help me put it out!",													 	"l",	"house_fire"],
	["My son is missing. I need you to help me find him.",											 	"w",	"child_missing"],
	["THE STORE IS ON FIRE! We need to save it!",													 	"w",	"store_fire"],
	["My kid fell into the river! Help me get him out!",											 	"w",	"child_river"],
	["Holy smokes! A bear is in the village. Get him to leave with by luring him out with food.",	 	"w",	"bear"],
	["A cougar just breached the village boundary! Lure him away with some food from the store.",	 	"w",	"cougar"],
	["Brr, I don't have a house to go into in this cold. Can you take me to one?",						"p",	" "],
	["I'm gravely sick but I don't have medicine. Would you borrow some for me?",						"c",	" "],
	["My boy is about to fall out of a tree! Please catch him!",										"l",	"tree_child"],
	["I can't start a fire. Please bring my some wood from the forest.",								"c",	" "],
	["Go give the patients at the hospital some flowers from the store.",								"c",	" "],
	["Enemy knights have entered the village. Find someone who can chase them out!",					"w",	"knights_market"],
	["The store is running out of food, can you donate some? The farmer probably has some to spare.",	"c",	" "],
	["Please, I can't open the door. Push me over to it.",												"p",	" "],
	["Donate an organ for the sick at the hospital.",													"w",	" "],
	["Please donate money to the poor. Do you have some to spare?",										"c",	" "],
	["I'm tired but I need to work. Do you have any tea? You can get some for me at the market.",		"c",	" "],
	["I can't pay back my loan. I need your help. Please give me some money.",							"c",	" "],
	["I need wood for my fire but I can't go into the forest. Do you have any?",						"c",	" "],
	["AHHHHHHHHHHHHHHHHHHHH!  My child is about to fall into the river!",								"l",	"child_river"]
];

var negatives = [
	["That kid is standing close to the cliff.  Now's your chance to push him off!"],
	["Leave meat out and a cougar will come get it"],
	["Whoa!  You just tripped me"],
	["Hey, you meanie!  You just scared my cat up a tree!"],
	["You just pushed a disabled man off a horse!"],
	["Thief!  That man just stole my food"],
	["Who left this food out?  It drew a bear in!"],
	["You just stomped out my fire!"],
	["You just killed my crops by walking over them!"],
	["Fire! Fire!  I just saw you light that hut on fire!"],
	["You just stole food from the store!"],
	["Devil!  You just walked over my father's grave and disturbed the dead"],
	["Did you just push my horse away?"],
	["My horse!  Who is the criminal that pushed him into the river?"],
	["You just threw me off my horse!"]
];

var successMessage = "Yay! Thank you for helping me!";