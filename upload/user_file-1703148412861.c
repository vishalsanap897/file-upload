#include<stdio.h>
int main() {
    int arr[10] = {1,2,3,4,5,6,7,8,9,10};
    
    int sum=0, average;
    
    for(int i=0;i<10;i++){
        sum += arr[i];
    }
    average = sum/10;
    printf("The average of given numbers : %d", average);

    return 0;
}