#include<iostream>

using namespace std;

long double fact( int n ) {
    if (n==0) return 1;
    else {
        n = n * fact(n-1);
    }
    return n;
}
int main()
{
    cout << fact(50.0);
}
