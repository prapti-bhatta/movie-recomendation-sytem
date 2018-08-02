import math


def similarity (person1, person2):
    person1_items = person1[1]
    person2_items = person2[1]

    common_ranked_items = [item for item in person1_items if item in person2_items]

    n = len(common_ranked_items)

    s1 = sum(person1_items[item] for item in common_ranked_items)
    s2 = sum(person2_items[item] for item in common_ranked_items)

    ss1 = sum(pow(person1_items[item], 2) for item in common_ranked_items)
    ss2 = sum(pow(person2_items[item], 2) for item in common_ranked_items)

    ps = sum (person1_items[item] * person2_items[item] for item in common_ranked_items)

    numerator = n * ps - (s1 * s2)

    denominator = math.sqrt((n * ss1 - math.pow(s1, 2)) * (n * ss2 - math.pow(s2, 2)))

    return (numerator / denominator) if denominator != 0 else 0
