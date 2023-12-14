def req(arr):
    flag = any(arr)
    if not flag:
        return 0

    diff = []
    for i in range(len(arr)-1):
        diff.append(arr[i+1] - arr[i])

    return req(diff) + diff[-1]


def main():
    with open("input.txt") as f:
        content = [l.split() for l in f.readlines()]

    ans = 0

    for arr in content:
        arr = [int(x) for x in arr]
        
        # Part TWO
        arr.reverse()
        
        ans += req(arr) + arr[-1]

    print(ans)


if __name__ == "__main__":
    main()