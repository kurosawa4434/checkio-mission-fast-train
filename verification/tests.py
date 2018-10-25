"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [(4, 3)],
            "answer": 3,
            "explanation": [1, 2, 1],
        },
        {
            "input": [(9, 7)],
            "answer": 5,
            "explanation": [1, 2, 3, 2, 1],
        },
        {
            "input": [(5, 5), (4, 2)],
            "answer": 6,
            "explanation": [1, 2, 2, 2, 1, 1],
        },
        {
            "input": [(5, 5,), (4, 2), (6, 3)],
            "answer": 8,
            "explanation": [1, 2, 2, 2, 2, 3, 2, 1],
        },
    ],
    "Extra": [
        {
            "input": [(10, 5), (2, 5), (3, 5)],
            "answer": 7,
            "explanation": [1, 2, 3, 3, 3, 2, 1],
        },
        {
            "input": [(10, 5), (12, 10), (3, 5)],
            "answer": 9,
            "explanation": [1, 2, 3, 4, 5, 4, 3, 2, 1],
        },
        {
            "input": [(10, 5), (13, 10), (3, 5)],
            "answer": 10,
            "explanation": [1, 2, 3, 4, 5, 4, 3, 2, 1, 1],
        },
        {
            "input": [(10, 5), (17, 10), (3, 5)],
            "answer": 10,
            "explanation": [1, 2, 3, 4, 5, 5, 4, 3, 2, 1],
        },
        {
            "input": [(10, 5), (18, 10), (3, 5)],
            "answer": 11,
            "explanation": [1, 2, 3, 4, 5, 4, 4, 3, 2, 2, 1],
        },
        {
            "input": [(8, 3), (1, 1), (8, 3)],
            "answer": 9,
            "explanation": [1, 2, 3, 2, 1, 2, 3, 2, 1],
        },
    ],
}
