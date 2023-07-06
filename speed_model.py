import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load the training data
data = pd.read_csv('training_data.csv')

# Split the data into input features (X) and target variable (y)
X = data[['Given speed', 'Time left to change signal']].values
y = data['Suggested speed'].values

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model on the testing set
score = model.score(X_test, y_test)
print(f"Model score: {score}")

# Example usage to get speed suggestion
given_speed = 50  # Current speed
time_left = 15  # Time left for the next signal to change

# Reshape the input to match the model's expected format
input_data = [[given_speed, time_left]]

# Predict the speed suggestion
suggested_speed = model.predict(input_data)[0]
