import json


def parse(json_str, template_str):
	# print("json:")
	# print(json_str)

	parsed_json = json.loads(json_str)

	nonrequired_items = ("mobile", "email", "branch", "skills", "Achievements", "AreasOfInt", "ques1", "ques2", "ques3", "ques4")
	details = {}

	for item in nonrequired_items:
		if item in parsed_json and parsed_json[item] != "":
			details[item] = parsed_json[item]
		else:
			details[item] = "Not Entered"


	# parsed_json = json.loads(json_str)
	details["name"] = parsed_json["name"]
	# mobile = str(parsed_json["Mobile"])
	# email = parsed_json["Email"]
	# branch = parsed_json["Branch"]
	# TODO: Splitting of string with commas not working. Will have to come up with newer solution
	details["rollNumber"] = parsed_json["rollNumber"]
	# skills = parsed_json["Skills"]
	# achievements = parsed_json["Achievements"]
	# areasInt = parsed_json["Area of Interest"]
	# answer1 = parsed_json["Ques1"]
	# answer2 = parsed_json["Ques2"]
	# answer3 = parsed_json["Ques3"]
	# answer4 = parsed_json["Ques4"]

	skills_list = details["skills"].split(',')
	skills_str = ""
	for item in skills_list:
		item.replace("\n", "")
		skills_str += "\item "+item

	achievement_list = details["Achievements"].split('\n')
	achievements_str = ""
	for item in achievement_list:
		item.replace("\n", "")
		achievements_str += "\item "+item

	interest = details["AreasOfInt"].split(',')
	interest_str = ""
	for item in interest:
		item.replace("\n", "")
		interest_str += "\item "+item

	InterestAreas = "Areas of Interest"
	Question1 = "Why should we select you?"
	Question2 = "What will you do for our club?"
	Question3 = "What are your expectations from us?"
	Question4 = "Do you prefer working independently or in a team?"

	x = r"""
	\cvsection{About Myself}
	\begin{cventries}
	\cventry
	{}{Skills}{}{}
	{
		\begin{cvitems}
		[skills]
		\end{cvitems}
	}

	\cventry
	{}{Achievements}{}{}
	{
		\begin{cvitems}
		[achievements]
		\end{cvitems}
	}

	\cventry
	{}{AreasOfInt}{}{}
	{
		\begin{cvitems}
		[interest]
		\end{cvitems}
	}

	\cventry
	{}{Question1}{}{}
	{
		\begin{cvitems}
		[Answer1]
		\end{cvitems}
	}

	\cventry
	{}{Question2}{}{}
	{
		\begin{cvitems}
		[Answer2]
		\end{cvitems}
	}

	\cventry
	{}{Question3}{}{}
	{
		\begin{cvitems}
		[Answer3]
		\end{cvitems}
	}

	\cventry
	{}{Question4}{}{}
	{
		\begin{cvitems}
		[Answer4]
		\end{cvitems}
	}

	\end{cventries}
	"""

	template_str = template_str.replace("[content]",x)
	template_str = template_str.replace("[skills]",skills_str)

	template_str = template_str.replace("AreasOfInt",InterestAreas)
	template_str = template_str.replace("[interest]",interest_str)

	template_str = template_str.replace("Question1", Question1)
	template_str = template_str.replace("[Answer1]",details["ques1"])

	template_str = template_str.replace("Question2", Question2)
	template_str = template_str.replace("[Answer2]",details["ques2"])

	template_str = template_str.replace("Question3", Question3)
	template_str = template_str.replace("[Answer3]",details["ques3"])

	template_str = template_str.replace("Question4", Question4)
	template_str = template_str.replace("[Answer4]",details["ques4"])

	template_str = template_str.replace("[achievements]",achievements_str)

	template_str = template_str.replace("[firstname]",details["name"])
	template_str = template_str.replace("[lastname]", "")
	template_str = template_str.replace("[mobile]", str(details["mobile"]))
	template_str = template_str.replace("[email]", details["email"])
	template_str = template_str.replace("[branch]", details["branch"])
	template_str = template_str.replace("[rollnum]", details["rollNumber"])


	return template_str
