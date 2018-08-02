def recommend(people, person_index, bound, similarity):
    person = people[person_index]
    person_items = person[1]
    scores = [(similarity(person, other), other) for other in people if other != person]

    scores.sort()
    scores.reverse()
    scores = scores[0:bound]

    recommendations = {}

    for similarity, other in scores:
        other_items = other[1]

        for item in other_items:
            if item not in person_items:
                weight = similarity * other_items[item]

                if item in recommendations:
                    s, weights = recommendations[item]
                    recommendations[item] = (s + similarity, weights + [weight])
                else:
                    recommendations[item] = (similarity, [weight])
 
    for r in recommendations:
        similarity, item = recommendations[r]
        recommendations[r] = sum(item) / similarity

    return recommendations
