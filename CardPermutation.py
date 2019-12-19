from bisect import bisect_right, bisect_left

MOD = 10 ** 9 + 7
N = 3 * 10 ** 5


class SegmentTree:
    def __init__(self, arr):
        self.size = len(arr)
        self.tree = [0] * (2 * self.size)
        self.build(arr)
        
    def build(self, arr):
        for i in range(n):
            self.tree[i + n] = arr[i]
        for i in range(self.size - 1, 0, -1):
            self.tree[i] = self.tree[i << 1] + self.tree[i << 1 | 1]
            
    def query(self, l, r):
        if l > r:
            return 0
        l += self.size
        r += self.size
        s = 0
        while l <= r:
            if l % 2 == 1:
                s += self.tree[l]
                l += 1
            if r % 2 == 0:
                s += self.tree[r]
                r -= 1
            l >>= 1
            r >>= 1
        return s
    def update(self, i, x):
        i += n
        self.tree[i] = x
        while i > 1:
            self.tree[i >> 1] = self.tree[i] + self.tree[i ^ 1]
            i >>= 1


def binomial(n, k):
    if n < k or k < 0:
        return 0
    return (fac[n] * inv_fac[k] * inv_fac[n - k]) % MOD

def factorial(n):
    if n < 0:
        return 0
    return fac[n]

def my_bisect(a, x):
    return bisect_left(a, x)




fac = [1] * (N + 1)
inv_fac = [1] * (N + 1)
for i in range(1, N + 1):
    fac[i] = (fac[i - 1] * i) % MOD
    inv_fac[i] = (inv_fac[i - 1] * pow(i, MOD - 2, MOD)) % MOD
    
n = int(input().strip())
p = list(map(int, input().strip().split()))

S = set(range(n))

for i in range(n):
    p[i] -= 1
    if p[i] != -1:
        S.remove(p[i])
sum_S = sum(S)
m = len(S)
S = sorted(S)
ans = fac[m]
c = 0
T = 0
H = SegmentTree([0] * n)

for k in range(n):
    if p[k] == -1:
        A = (factorial(n - 1 - k) * factorial(c) * factorial(m - 1 - c)) % MOD
        B = (binomial(m - 1, c) * (sum_S - T) - binomial(m - 2, c - 1) * m * (m - 1) // 2) % MOD
        ans = (ans + A * B) % MOD
        c += 1
    else:
        A = (fac[n - 1 - k] * factorial(c) * factorial(m - c)) % MOD
        B = ((p[k] - H.query(0, p[k] - 1)) * binomial(m, c) - my_bisect(S, p[k]) * binomial(m - 1, c - 1)) % MOD
        ans = (ans + A * B) % MOD
        H.update(p[k], 1)
        j = bisect_right(S, p[k])
        T += m - j
        
        
print(ans)
