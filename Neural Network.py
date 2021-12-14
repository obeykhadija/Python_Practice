import numpy as np
from numpy.random.mtrand import sample

'''
Using functional programming
inputs = [[1, 2, 3, 2.5],
          [2, 5, -1, 2.0],
          [-1.5, 2.7, 3.3, -0.8]] # (3, 4)

weights = [[0.2, 0.8, -0.5, 1.0], 
           [0.5, -0.91, 0.26, -0.5],
           [-0.26, -0.27, 0.17, 0.87]] # (3, 4)

weights = np.array(weights)
biases = [2, 3, 0.5]

weights2 = [[0.1, 0.14, -0.5], 
           [-0.5, 0.12, -0.33],
           [0.44, 0.73, -0.13]] 

weights2 = np.array(weights2)
biases2 = [-1, 2, -0.5]
'''

'''
Using explicit for loops
layer_outputs = []                                          # output of the current layer
for neuron_weight, neuron_bias in zip(weights, biases):
    neuron_output = 0                                       # output of a single neuron
    for n_input, n_weight in zip(inputs, neuron_weight):
        neuron_output += n_input*n_weight
    neuron_output += neuron_bias
    layer_outputs.append(neuron_output)
'''
'''
layer1_outputs = np.dot(inputs, weights.T) + biases
layer2_outputs = np.dot(layer1_outputs, weights2.T) + biases2

print(layer1_outputs)
print(layer2_outputs)
'''

'''
Shape Examples
1. [1, 5, 6, 2]
shape = (4,)
type = 1D array, vector

2. [[1, 5, 6, 9],
    [2, 4, 3, 1]]
shape = (2, 4)
type = 2D array, matrix

3. [[[1, 5, 6, 9],
    [2, 4, 3, 1]],
    [[1, 5, 2, 9],
    [2, 4, 3, 5]],
    [[8, 5, 6, 9],
    [2, 3, 7, 1]]]
shape = (3, 2, 4)
type = 3D array, matrix
'''
'''
X = [[1, 2, 3, 2.5],
     [2, 5, -1, 2.0],
     [-1.5, 2.7, 3.3, -0.8]]
'''

# Building NN Using OOP

np.random.seed(0)
from spiral_data import spiral_data

X, y = spiral_data(points=100, classes=3)
    
class DenseLayer():
    def __init__(self, n_inputs, n_neurons):
        self.weights = np.random.randn(n_inputs, n_neurons)
        self.biases = np.zeros((1, n_neurons))
    def forward(self, inputs):
        self.Z = np.dot(inputs, self.weights) + self.biases

class ActivationReLU:
    def ReLU(self, inputs):
        self.outputs = np.maximum(0, inputs)

class ActivationSoftmax:
    def Softmax(self, inputs):
        exp_values = np.exp(inputs - np.max(inputs, axis=1, keepdims=True))
        self.outputs = exp_values / np.sum(exp_values, axis=1, keepdims=True)

class Loss:
    def calculate(self, outputs, y):
        sample_losses = self.forward(outputs, y)
        data_loss = np.mean(sample_losses)
        return data_loss

class CategoricalCrossEntropy(Loss):
    def forward(self, y_pred, y_true):
        samples = len(y_pred)
        y_pred_clipped = np.clip(y_pred, 1e-7, 1-1e-7)

        if len(y_true.shape) == 1:
            correct_confidences = y_pred_clipped[range(samples), y_true]
        elif len(y_true.shape) == 2:
            correct_confidences = np.sum(y_pred_clipped*y_true, axis=1)

        neg_log_probs = -np.log(correct_confidences)
        return neg_log_probs



# Create Layer 1 and ReLU Object
layer1 = DenseLayer(2, 3)
ReLU_Activation = ActivationReLU()

# Create Output Layer and Softmax Object
layer2 = DenseLayer(3, 3)
Softmax_Activation = ActivationSoftmax()

# Layer 1 Forward Prop
layer1.forward(X)
ReLU_Activation.ReLU(layer1.Z)

# Layer 2 Categorical Crossentropy = -logyhat -> used for calculating loss in softmax (i.e. multi-class classification)
layer2.forward(ReLU_Activation.outputs)
Softmax_Activation.Softmax(layer2.Z)

# Multi-class Classification Probabilities 
print('Softmax Outputs:', Softmax_Activation.outputs[:5])
print()

# Determine Loss
loss_function = CategoricalCrossEntropy()
loss = loss_function.forward(Softmax_Activation.outputs, y)

print('Loss:', loss[:36:])
print()



