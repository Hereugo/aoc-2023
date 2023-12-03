#include <iostream>
#include <vector>

using namespace std;

const int MAXN = 1000;

int n, m;

char a[MAXN][MAXN];
bool been[MAXN][MAXN];

const int X[8] = {0, 0, 1, -1, -1, -1, 1, 1};
const int Y[8] = {1, -1, 0, 0, -1, 1, -1, 1};

bool isdigit(char x) {
    return (x >= '0' && x <= '9');
}

bool in_bound(int x, int y) {
    return (x >= 0 && x < n && y >= 0 && y < m);
}

vector<int> neighbor_to(int x, int y) {
    vector <int> pos;
    for (int i = 0; i < 8; i++) {
        int nx = x + X[i];
        int ny = y + Y[i];

        if (!in_bound(nx, ny)) {
            continue;
        }

        if (isdigit(a[nx][ny])) {
            pos.push_back(i);
        }
    }

    return pos;
}

int main() {
    // Input
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
        }
    }

    int ans = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (isdigit(a[i][j]) || a[i][j] == '.') {
                continue;
            }

            // Part two
            if (a[i][j] != '*') {
                continue;
            }

            vector <int> p = neighbor_to(i, j);

            int mul = 1, cnt = 0;
            for (auto k: p) {
                int x = i + X[k];
                int y = j + Y[k];

                while (in_bound(x, y + 1) && isdigit(a[x][y + 1])) {
                    y++;
                }

                int num = 0, t = 1;
                bool bflag = false;
                do {
                    if (been[x][y]) {
                        bflag = true;
                    }
                    been[x][y] = true;

                    num += (a[x][y] - '0') * t;
                    y--;
                    t *= 10;
                } while (in_bound(x, y) && isdigit(a[x][y]));

                if (bflag) {
                    continue;
                }

                mul *= num;
                cnt++;
            }

            // cout <<mul<<" "<<cnt<<endl;

            if (cnt != 2) {
                continue;
            }

            ans += mul;
        }
    }

    std::cout << ans;
}