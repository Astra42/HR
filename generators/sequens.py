import os.path
import json
import random

"""Сейчас не получится создать два разных генератора для последовательностей
одинаковой длины. Иначе говоря, если создать 1ый генератор для последовательностей длины 8,
а потом создать другой тоже с длинной 8, то 2ой будет генерировать последовательности опираясь на те,
что создал 1ый и у него будут последовательности из симаолов 1го (на самом деле там немного сложнее все)
Такое поведение можно будет изменить, если понадобится"""

def find_variants(n):
    answ = 0
    for i in range(n):
        answ += n ** (i + 1)
    return answ


def choice_letter(letters):
    a = random.choice(letters)
    while len(a) != 1:
        a = random.choice(letters)
    return a


class Generator:
    def __init__(self, length, alphabet):
        self.length = length
        self.alphabet = alphabet
        self.countOfVariants = find_variants(length)
        self.json_way = f"generators\{length}LengthVariants.json"

    def sequence_generator(self):
        d = {symbhol: {} for symbhol in self.alphabet}
        d["pC"] = 0
        if not os.path.exists(self.json_way):
            with open(self.json_way, "w") as outfile:
                json.dump(d.copy(), outfile)

        with open(self.json_way) as json_file:
            data = json.load(json_file)

        if data["pC"] == self.countOfVariants:
            print(f"Уникальные оследовательности длины {self.length} закончились")
            return
        answer = ""
        data_iteration = data
        for i in range(self.length):
            cur_letter = choice_letter(list(data_iteration.keys()))
            flag = False
            if len(data_iteration[cur_letter]) == 1:
                while len(data_iteration[cur_letter]) == 1:
                    data_iteration.pop(cur_letter)
                    data["pC"] += 1
                    if len(data_iteration) == 1:
                        flag = True
                        break
                    cur_letter = choice_letter(list(data_iteration.keys()))
            if flag:
                with open(self.json_way, 'w') as outfile:
                    json.dump(data, outfile)
                return self.sequence_generator()
            if i == self.length - 1:
                data_iteration.pop(cur_letter)
                data["pC"] += 1
                answer += cur_letter
            else:
                if len(data_iteration[cur_letter]) == 0:
                    data_iteration[cur_letter] = d.copy()
                    data_iteration = data_iteration[cur_letter]
                    answer += cur_letter
                else:
                    data_iteration = data_iteration[cur_letter]
                    answer += cur_letter

        with open(self.json_way, 'w') as outfile:
            json.dump(data, outfile)

        return answer
