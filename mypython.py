# Python Practice

# Organizing Data
#Example: Highscore Comparison
user_scores = [12, 42, 55, 100, 11, 22]
highest = user_scores[0]

for score in user_scores:
  if score > highest:
    highest = score
 
print(f'Highest score: {highest}')

#Example: Updating Humidity Data
humidity_level = [87, 83, 89, 88, 87]
humidity_level.insert(0, 90)
humidity_level.pop()

print(humidity_level)
 
#Example: Latest Stock Trends

