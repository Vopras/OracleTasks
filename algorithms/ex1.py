def only_unique_letters(string):
    dictionary = {}
    for letter in string:
        if letter in dictionary:
            return False
        else:
            dictionary[letter] = 1
    return True


print(only_unique_letters('asdasd'))
print(only_unique_letters('asdfgh'))
print(only_unique_letters('a'))
print(only_unique_letters('aa'))
print(only_unique_letters('asdddssa'))


def only_unique_letters_no_structures(string):
    for i in range(len(string)):
        for j in range(i+1, len(string)):
            if string[i] == string[j]:
                return False
    return True

print('--------------')
print(only_unique_letters_no_structures('asdasd'))
print(only_unique_letters_no_structures('asdfgh'))
print(only_unique_letters_no_structures('a'))
print(only_unique_letters_no_structures('aa'))
print(only_unique_letters_no_structures('asdddssa'))
