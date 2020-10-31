#!/bin/sh

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output $GITHUB_WORKSPACE/android/app/my-release-key.keystore $GITHUB_WORKSPACE/.github/scripts/my-release-key.keystore.gpg