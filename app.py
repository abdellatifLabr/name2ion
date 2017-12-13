# This file contains the algorythm of this app writed in python :)

def getCombs(length):
    ranks = [x for x in range(0, length/2 + 1)]
    combs = [createComb(length, rank) for rank in ranks]
    return combs


def createComb(length, num_of_twos):
    comb = []
    for x in range(0, length - num_of_twos):
        subcomb = [1 for i in range(0, length - num_of_twos)]
        if x + num_of_twos <= len(subcomb):
            for i in range(x, x + num_of_twos):
                subcomb[i] = 2
            comb.append(subcomb)
    
    return comb



for comb in getCombs(int(raw_input('> '))):
    for subcomb in comb:
        print(subcomb)