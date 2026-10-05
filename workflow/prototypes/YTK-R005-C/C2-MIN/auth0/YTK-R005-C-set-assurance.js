/**
 * YTK-R005-C / C2-MIN
 * Auth0 Post-Login Action draft
 *
 * Scope:
 * - Detect Auth0 passkey authentication method.
 * - Add signed, namespaced assurance claims to tokens.
 * - Never elevate unknown/non-passkey methods above A1.
 * - No secrets, no external HTTP calls, no user profile fields.
 *
 * IMPORTANT:
 * This Action being deployed/configured does NOT prove actual A2.
 * Actual Passkey enrollment/login/event/token/log verification remains unapproved
 * until C2-APP-007 / C3 is separately authorized.
 */

/** @import {Event, PostLoginAPI} from "@auth0/actions/post-login/v3" */

const CLAIM_NAMESPACE = "https://api.yattoko.invalid/r005c/claims";
const ASSURANCE_VERSION = "ytk-assurance-v1";

/**
 * @param {Event} event
 * @param {PostLoginAPI} api
 */
exports.onExecutePostLogin = async (event, api) => {
  const methods = Array.isArray(event.authentication?.methods)
    ? event.authentication.methods
    : [];

  const passkeyObserved = methods.some(
    (method) => method?.name === "passkey"
  );

  const assuranceLevel = passkeyObserved ? "A2" : "A1";

  api.idToken.setCustomClaim(
    `${CLAIM_NAMESPACE}/assurance_level`,
    assuranceLevel
  );
  api.idToken.setCustomClaim(
    `${CLAIM_NAMESPACE}/assurance_version`,
    ASSURANCE_VERSION
  );

  // Access-token claims are added when an authorization context exists.
  if (event.authorization) {
    api.accessToken.setCustomClaim(
      `${CLAIM_NAMESPACE}/assurance_level`,
      assuranceLevel
    );
    api.accessToken.setCustomClaim(
      `${CLAIM_NAMESPACE}/assurance_version`,
      ASSURANCE_VERSION
    );
  }
};
