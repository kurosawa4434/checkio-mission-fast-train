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
            "explanation": 'basic',
        },
        {
            "input": [(9, 7)],
            "answer": 5,
            "explanation": '1 section',
        },
        {
            "input": [(5, 5), (4, 2)],
            "answer": 6,
            "explanation": '2 sections',
        },
        {
            "input": [(5, 5,), (4, 2), (6, 3)],
            "answer": 8,
            "explanation": '3 sections',
        },
    ],
}
