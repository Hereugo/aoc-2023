from pprint import pprint
from functools import reduce, cmp_to_key

ctn = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    'J': 1,
}

def get_type(card):
    been = {}
    for c in card:
        been[c] = been.get(c, 0) + 1

    # PART TWO
    j = been.pop('J', 0)
    k = max(been, key=been.get) if been else 'A'
    been[k] = been.get(k, 0) + j

    v = list(been.values())
    v.sort()

    if v == [5]:
        return 7
    elif v == [1, 4]:
        return 6
    elif v == [2, 3]:
        return 5
    elif v == [1, 1, 3]:
        return 4
    elif v == [1, 2, 2]:
        return 3
    elif v == [1, 1, 1, 2]:
        return 2
    elif v == [1, 1, 1, 1, 1]:
        return 1


def compare_by_type(card1, card2):
    t1 = get_type(card1[0])
    t2 = get_type(card2[0])
    if t1 > t2:
        return 1
    elif t1 < t2:
        return -1
    else:
        return compare_by_val(card1, card2)


def compare_by_val(card1, card2):
    for i in range(len(card1[0])):
        if card1[0][i] != card2[0][i]:
            if ctn[card1[0][i]] > ctn[card2[0][i]]:
                return 1
            else:
                return -1
    return 0

def main():
    with open("input.txt") as f:
        cards = [l.split() for l in f.readlines()]
        cards = [(c[0], int(c[1])) for c in cards]

    cards = sorted(cards, key=cmp_to_key(compare_by_type))

    ans = reduce(lambda a, b: a + b[1][1] * (b[0] + 1), enumerate(cards), 0)
    print(ans)

if __name__ == "__main__":
    main()