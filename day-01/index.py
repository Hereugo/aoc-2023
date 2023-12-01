f = open('./input.txt')

text_to_digit = {
    # 'zero': 0,
    'one': 'one1one',
    'two': 'two2two',
    'three': 'three3three',
    'four' : 'four4four',
    'five' : 'five5five',
    'six' : 'six6six',
    'seven' : 'secen7seven',
    'eight' : 'eight8eight',
    'nine' : 'nine9nine'
}

words = f.read().split()

ans = 0

for word in words:
    for key, value in text_to_digit.items():
        word = word.replace(key, str(value))

    digits = [x for x in word if x.isdigit()]

    d1 = int(digits[0]) if len(digits) > 0 else 0
    d2 = int(digits[-1]) if len(digits) > 0 else 0

    print(digits)
    print(word)
    print(d1, d2)

    print(d1 * 10 + d2)

    ans += d1 * 10 + d2

print(ans)
    

f.close()