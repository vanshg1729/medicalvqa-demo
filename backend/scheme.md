# Schema for Medical VQA

### User
- email
- name
- age
- role ["editor", "viewer", "admin"]
- contact information
- questions added
- images added

### Category
- name: name of the category
- images: list of image id which have this category
- text: text describing this category
- user: id of the user who created this category

### Tags
- name: name of the tag
- link to images

### Images
- user : contains the user id of the creator from User schema
- categories : contains a list of ids from "Category" schema
- tags: contains a list of ids from "Tags" schema
- path : contains string of the local path of image
- questions: contains a list of ids from "Questions" schema
- creation time

### Questions
- image : contains the image id from ImagesSchema to which it belongs to
- questionText: contains the string question
- answerText: contains the answer for this question
- user: contains the id of the user who created it (from User Schema)
- admin: contains the id of the user admin who approved (from User Schema)
- creation time : contains the time when the question was created
- approval time : contains the time when the question was approved