def get_nr_of_unique_chars(string):
    dictionary = {}
    for letter in string:
        if letter in dictionary:
            dictionary[letter] += 1
        else:
            dictionary[letter] = 1
    return len(dictionary)

def continguous_string(string, number):
    string_len = len(string)
    result = 0
    result_substring = []
    for i in range(string_len - number+1):
        print(f'checking {string[i:i+number]}')
        if get_nr_of_unique_chars(string[i:i+number]) == number-1:
            result += 1
            result_substring.append(string[i:i+number])
    return result, result_substring



# print(get_nr_of_unique_chars('a'))
# print(get_nr_of_unique_chars('aa'))
# print(get_nr_of_unique_chars('abd'))
# print(get_nr_of_unique_chars('adasd'))
# print(get_nr_of_unique_chars('aasdasd'))
# print(get_nr_of_unique_chars('aasdasd'))
# print(get_nr_of_unique_chars('arfrfgeqwes'))

print(continguous_string('aabbcd', 3))
print(continguous_string('aabbcd', 4))