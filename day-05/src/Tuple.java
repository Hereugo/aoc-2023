
public interface Tuple<S1, S2, S3> {

    static Tuple<Long, Long, Long> of(long destStart, long sourStart, long rangLength) {
        return new Tuple<Long, Long, Long>() {
            @Override
            public Long getFirst() {
                return destStart;
            }

            @Override
            public Long getSecond() {
                return sourStart;
            }

            @Override
            public Long getThird() {
                return rangLength;
            }
        };
    }

    S1 getFirst();

    S2 getSecond();

    S3 getThird();
}
