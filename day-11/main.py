from functools import reduce


def in_bound(x, a, b):
    a, b = min(a, b), max(a, b)
    return 1 if a <= x <= b else 0


def expand(content):
    erows = []
    ecols = []

    for i, row in enumerate(content):
        if not any(map(lambda x: x == '#', row)):
            erows.append(i)

    for j in range(len(content[0])):
        flag = True
        for i in range(len(content)):
            if content[i][j] == '#':
                flag = False
        
        if flag:
            ecols.append(j)

    return erows, ecols


def get_galaxies(content):
    galaxies = []
    for i, row in enumerate(content):
        for j, col in enumerate(row):
            if col == '#':
                galaxies.append((i, j))

    return galaxies


def dist(g, i, j):
    return abs(g[i][0] - g[j][0]) + abs(g[i][1] - g[j][1])


def main():
    with open('input.txt', 'r') as f:
        c = [x for x in f.read().splitlines()]

    erows, ecols = expand(c)
    g = get_galaxies(c)

    ans = 0
    for i in range(len(g)):
        for j in range(len(g)):
            if i == j:
                continue

            # part two
            coeff_x = 1_000_000 - 1
            coeff_y = 1_000_000 - 1

            # number of elements between g[i][1] and g[j][1] in ecols
            expansion_x_offset = reduce(lambda x, y: x + in_bound(y, g[i][1], g[j][1]), ecols, 0) * coeff_x
            # number of elements between g[i][0] and g[j][0] in erows
            expansion_y_offset = reduce(lambda x, y: x + in_bound(y, g[i][0], g[j][0]), erows, 0) * coeff_y

            res = dist(g, i, j) + expansion_x_offset + expansion_y_offset 

            ans += res

    print(ans // 2)


if __name__ == '__main__':
    main()